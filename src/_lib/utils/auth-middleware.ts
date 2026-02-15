import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken, JWTPayload } from "@/_lib/utils/jwt"
import prisma from "@/server/client"

export interface AuthenticatedRequest extends NextRequest {
    user?: {
        id: string
        email: string
        sessionId: string
    }
}

export async function authenticate(
    req: NextRequest
): Promise<{ authenticated: false } | { authenticated: true; user: JWTPayload }> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("auth-token")?.value

        if (!token) {
            return { authenticated: false }
        }

        const payload = await verifyToken(token)
        if (!payload) {
            return { authenticated: false }
        }

        // Verify session exists and is not expired
        const session = await prisma.session.findUnique({
            where: {
                id: payload.sessionId,
            },
        })

        if (!session || session.expiresAt < new Date()) {
            return { authenticated: false }
        }

        return {
            authenticated: true,
            user: payload,
        }
    } catch (error) {
        console.error("Erro na autenticação:", error)
        return { authenticated: false }
    }
}

export async function requireAuth(req: NextRequest): Promise<
    | { success: true; user: JWTPayload }
    | { success: false; response: NextResponse }
> {
    const auth = await authenticate(req)

    if (!auth.authenticated) {
        return {
            success: false,
            response: NextResponse.json(
                { success: false, error: "Não autorizado. Faça login para continuar." },
                { status: 401 }
            ),
        }
    }

    return {
        success: true,
        user: auth.user,
    }
}