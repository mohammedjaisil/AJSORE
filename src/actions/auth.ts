'use server';

import { signIn, signOut } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function signupAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password) return { error: "Missing fields" };

    try {
        // 1. Check if user already exists
        const { data: existingUser } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) return { error: "User already exists" };

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create user
        const { data: newUser, error: createError } = await supabaseAdmin
            .from('users')
            .insert({
                email,
                password: hashedPassword,
                name: name || email.split("@")[0],
                image: `https://i.pravatar.cc/150?u=${email}`,
                role: 'USER'
            })
            .select()
            .single();

        if (createError) throw createError;

        // 4. Sign in with the new account
        // We set redirect: false to handle the redirect manually and ensure a clean state
        await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        return { success: true };
    } catch (error) {
        return { error: "Failed to create account" };
    }
}

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return { error: "Missing fields" };

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) return { error: "Invalid credentials" };

        return { success: true };
    } catch (error) {
        return { error: "Authentication failed" };
    }
}

export async function socialLoginAction(provider: string) {
    await signIn(provider, { redirectTo: "/account" });
}

export async function logoutAction() {
    await signOut({ redirectTo: "/" });
}
