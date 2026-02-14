import { createAuthClient } from "better-auth/react";
import "better-auth/react";
export const authClient = createAuthClient({
    // Better Auth will look for the base URL in your env
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8000"
});



declare module "better-auth/react" {
    interface User {
        role: "ADMIN" | "TUTOR" | "USER";
        phone?: string; // Add phone here
    }
    // This part tells the updateUser function to accept phone
    interface UpdateUserOptions {
        phone?: string;
    }
}