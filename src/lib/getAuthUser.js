import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function getAuthUser() {
    // 1. Check NextAuth Session
    const session = await getServerSession(authOptions)
    if (session?.user) {
        return {
            ...session.user,
            // Ensure compatibility
            id: session.user.id,
            role: session.user.role || 'user'
        }
    }

    // 2. Check Custom Auth Token (auth-token)
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value
        // console.log("getAuthUser token:", token ? "Found" : "Missing");

        if (token) {
            const payload = await verifyToken(token)
            // console.log("getAuthUser payload:", payload);
            if (payload) {
                return {
                    id: payload.id,
                    name: payload.name || payload.email.split('@')[0], // Fallback name
                    email: payload.email,
                    role: payload.role || 'user'
                }
            } else {
                console.log("getAuthUser: verifyToken returned null");
            }
        }
    } catch (e) {
        console.error("Error reading cookies in getAuthUser", e)
    }

    // console.log("getAuthUser: Returning null");
    return null
}
