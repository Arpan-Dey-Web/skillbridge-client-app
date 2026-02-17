import { Roles } from "@/constants/roles";
import { userService } from "@/service/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for verify-email route
    if (pathname.startsWith("/verify-email")) {
        return NextResponse.next();
    }

    // Check for session token in cookies
    const sessionToken = request.cookies.get("better-auth.session_token");

    //* User is not authenticated at all
    if (!sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow access if session exists
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};





function roleRedirect(role: string, request: NextRequest) {
    let target = "/dashboard"; // Default for Student

    if (role === Roles.admin) target = "/dashboard/admin";
    if (role === Roles.tutor) target = "/dashboard/tutor";

    return NextResponse.redirect(new URL(target, request.url));
}

