import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
    const session = await auth();
    if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN")) {
        redirect("/");
    }
    return session;
}
