import { createAuthClient } from "better-auth/react";
import "better-auth/react";


export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : "",
    fetchOptions: {
        credentials: "include",
    },

    // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    // fetchOptions: {
    //     credentials: "include",
    // },
});



declare module "better-auth/react" {
    interface User {
        role: "ADMIN" | "TUTOR" | "STUDENT";
        phone?: string | null;
        status: "ACTIVE" | "BANNED";
    }

    interface Session {
        user: User;
    }
}



export const getSessionFromConsole = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
});