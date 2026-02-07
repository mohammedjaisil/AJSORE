import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const proxy = auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")

    if (isOnAdmin) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.nextUrl))
        const role = req.auth?.user?.role;
        if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
            return NextResponse.redirect(new URL("/", req.nextUrl))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/admin/:path*", "/account/:path*"],
}
