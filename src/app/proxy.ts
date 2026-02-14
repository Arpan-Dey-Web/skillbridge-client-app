import { Roles } from "@/constants/roles";
import { userService } from "@/service/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const { data } = await userService.getSession();
    const user = data?.user;

    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = user.role; // e.g., "ADMIN", "TUTOR", "STUDENT"


    // --- ADMIN PROTECTION ---

    if (pathname.startsWith("/dashboard/admin") && role !== Roles.admin) {
        return roleRedirect(role, request);
    }

    // --- TUTOR PROTECTION ---

    if (pathname.startsWith("/dashboard/tutor") && role !== Roles.tutor) {
        return roleRedirect(role, request);
    }

    // --- STUDENT PROTECTION (ROOT DASHBOARD) ---
    const isStudentArea = pathname === "/dashboard" ||
        pathname.startsWith("/dashboard/bookings") ||
        pathname.startsWith("/dashboard/profile");

    if (isStudentArea && role !== Roles.student) {
        return roleRedirect(role, request);
    }

    return NextResponse.next();
}


function roleRedirect(role: string, request: NextRequest) {
    let target = "/dashboard"; // Default for Student

    if (role === Roles.admin) target = "/dashboard/admin";
    if (role === Roles.tutor) target = "/dashboard/tutor";

    return NextResponse.redirect(new URL(target, request.url));
}

export const config = {
    matcher: [
        "/dashboard/:path*",
    ],
};