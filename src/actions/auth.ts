'use server';

import { signIn, signOut } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function signupAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password) return { error: "Email and password are required." };

    try {
        // 1. Check if user already exists
        const { data: existingUser } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) return { error: "An account with this email already exists. Please sign in." };

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create user
        const { error: createError } = await supabaseAdmin
            .from('users')
            .insert({
                email,
                password: hashedPassword,
                name: name || email.split("@")[0],
                image: `https://i.pravatar.cc/150?u=${email}`,
                role: 'USER'
            });

        if (createError) throw createError;

        return { success: true };
    } catch (error) {
        console.error('Signup error:', error);
        return { error: "Failed to create account. Please try again." };
    }
}

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return { error: "Email and password are required." };

    try {
        // Step 1: Manually verify credentials before calling signIn
        const { data: user } = await supabaseAdmin
            .from('users')
            .select('id, email, password, role')
            .eq('email', email)
            .single();

        if (!user) return { error: "No account found with that email address." };
        if (!user.password) return { error: "This account uses social login. Please sign in with Google." };

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return { error: "Incorrect password. Please try again." };

        // Step 2: Credentials verified — trigger signIn with redirect
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/account",
        });

        return { success: true };
    } catch (error: any) {
        // NEXT_REDIRECT is thrown by Next.js on successful redirect — this is expected
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            return { success: true };
        }
        console.error('Login error:', error);
        return { error: "Authentication failed. Please try again." };
    }
}

export async function socialLoginAction(provider: string) {
    await signIn(provider, { redirectTo: "/account" });
}

export async function logoutAction() {
    await signOut({ redirectTo: "/" });
}
