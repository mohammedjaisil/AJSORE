import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { z } from "zod"
import { supabaseAdmin } from "./lib/supabase"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    }),
    providers: [
        Google,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data

                    // 1. Fetch user from Supabase
                    const { data: user } = await supabaseAdmin
                        .from('users')
                        .select('*')
                        .eq('email', email)
                        .single()

                    if (user && user.password) {
                        // 2. Verify password with bcrypt
                        const passwordsMatch = await bcrypt.compare(password, user.password);

                        if (passwordsMatch) {
                            return {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                                image: user.image,
                            }
                        }
                    }
                    return null;

                    // 2. Demo Auto-Signup: Create user if not exists
                    const { data: newUser, error: createError } = await supabaseAdmin
                        .from('users')
                        .insert({
                            email,
                            name: email.split("@")[0],
                            image: `https://i.pravatar.cc/150?u=${email}`,
                            role: 'USER'
                        })
                        .select()
                        .single()

                    if (newUser) {
                        return {
                            id: newUser.id,
                            email: newUser.email,
                            name: newUser.name,
                            role: newUser.role,
                            image: newUser.image,
                        }
                    }
                }
                return null
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token?.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role as "USER" | "ADMIN" | "SUPER_ADMIN";
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                if ((user as any).role) token.role = (user as any).role;
            }

            if (token.sub && !token.role) {
                const { data } = await supabaseAdmin
                    .from('users')
                    .select('role')
                    .eq('id', token.sub)
                    .single();

                if (data) {
                    token.role = data.role;
                }
            }
            return token
        }
    },
    session: {
        strategy: "jwt", // Credentials provider requires JWT strategy usually
    },
    pages: {
        signIn: "/login",
    }
})
