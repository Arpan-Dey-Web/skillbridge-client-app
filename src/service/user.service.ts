
import { cookies } from "next/headers";
const AUTH_URL = process.env.AUTH_URL
export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            })
            const session = await res.json();
            if (session === null) {
                return { data: null, error: { message: "session is missing" } }
            }

            return {
                data: session,
            };
        } catch (error) {
            return {
                data: null,
                error: {
                    message: "Something Went Wrong"
                }
            }
        }
    }
}