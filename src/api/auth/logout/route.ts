import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/server/client"
import { verifyToken } from "@/_lib/utils/jwt"

export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("auth-token")?.value

        if (token) {
            const payload = await verifyToken(token)
            
            if (payload?.sessionId) {
                // Delete session from database
                await prisma.session.delete({
                    where: {
                        id: payload.sessionId,
                    },
                }).catch(() => {
                    // Session might already be deleted, ignore error
                })
            }
        }

        // Create response
        const response = NextResponse.json(
            { success: true, message: "Logout realizado com sucesso!" },
            { status: 200 }
        )

        // Clear auth cookie
        response.cookies.delete("auth-token")

        return response
    } catch (error) {
        console.error("Erro no logout:", error)
        
        const response = NextResponse.json(
            { success: true, message: "Logout realizado com sucesso!" },
            { status: 200 }
        )

        response.cookies.delete("auth-token")
        return response
    }
}