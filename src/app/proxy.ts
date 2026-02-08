import { Roles } from "@/constants/roles";
import { userService } from "@/service/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const { data } = await userService.getSession();
    const user = data?.user;

    // 1. PUBLIC CHECK: If no session, they can't touch any dashboard path
    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = user.role; // e.g., "ADMIN", "TUTOR", "STUDENT"

    /**
     * 2. ROLE-BASED SEGREGATION (The "Jail" Logic)
     * If the path doesn't match their role, redirect them to their specific home.
     */

    // --- ADMIN PROTECTION ---
    // If path is /dashboard/admin/... and user is NOT an admin
    if (pathname.startsWith("/dashboard/admin") && role !== Roles.admin) {
        return roleRedirect(role, request);
    }

    // --- TUTOR PROTECTION ---
    // If path is /dashboard/tutor/... and user is NOT a tutor
    if (pathname.startsWith("/dashboard/tutor") && role !== Roles.tutor) {
        return roleRedirect(role, request);
    }

    // --- STUDENT PROTECTION (ROOT DASHBOARD) ---
    // If path is /dashboard (or nested like /dashboard/bookings) 
    // but the user is an ADMIN or TUTOR, they don't belong in the student area.
    const isStudentArea = pathname === "/dashboard" ||
        pathname.startsWith("/dashboard/bookings") ||
        pathname.startsWith("/dashboard/profile");

    if (isStudentArea && role !== Roles.student) {
        return roleRedirect(role, request);
    }

    return NextResponse.next();
}

/**
 * roleRedirect: Force-sends a user to their specific allowed base URL.
 * This prevents them from accessing custom typed URLs.
 */
function roleRedirect(role: string, request: NextRequest) {
    let target = "/dashboard"; // Default for Student

    if (role === Roles.admin) target = "/dashboard/admin";
    if (role === Roles.tutor) target = "/dashboard/tutor";

    return NextResponse.redirect(new URL(target, request.url));
}

export const config = {
    matcher: [
        "/dashboard/:path*", // Protects /dashboard and everything inside it
    ],
};