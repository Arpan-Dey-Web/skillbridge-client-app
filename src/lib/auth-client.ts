import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // Better Auth will look for the base URL in your env
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8000"
});