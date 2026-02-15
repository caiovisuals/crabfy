import { NextRequest, NextResponse } from "next/server"
import { compare } from "bcrypt"
import prisma from "@/server/client"
import { getClientIP } from "@/_lib/security/ip"
import { isRateLimited } from "@/_lib/security/rateLimit"
import { signToken } from "@/_lib/utils/jwt"

export async function POST(req: NextRequest) {
    const ip = getClientIP(req)

    try {
        const limited = await isRateLimited(ip, "auth")
        if (limited) {
            return NextResponse.json(
                { success: false, error: "Muitas tentativas de login. Tente novamente mais tarde." },
                { status: 429 }
            )
        }

        const body = await req.json()
        const { emailOrUsername, password } = body

        if (!emailOrUsername || !password) {
            return NextResponse.json(
                { success: false, error: "Email/usuário e senha são obrigatórios" },
                { status: 400 }
            )
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername.toLowerCase() },
                    { username: emailOrUsername },
                ],
            },
        })

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Email/usuário ou senha incorretos" },
                { status: 401 }
            )
        }

        const isValidPassword = await compare(password, user.password)
        if (!isValidPassword) {
            return NextResponse.json(
                { success: false, error: "Email/usuário ou senha incorretos" },
                { status: 401 }
            )
        }

        const sessionExpiresAt = new Date()
        sessionExpiresAt.setDate(sessionExpiresAt.getDate() + 30)

        const session = await prisma.session.create({
            data: {
                userId: user.id,
                token: crypto.randomUUID(),
                expiresAt: sessionExpiresAt,
            },
        })

        const token = await signToken({
            userId: user.id,
            email: user.email,
            sessionId: session.id,
        })

        const response = NextResponse.json(
            {
                success: true,
                message: "Login realizado com sucesso!",
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                    xp: user.xp,
                    level: user.level,
                },
            },
            { status: 200 }
        )

        response.cookies.set({
            name: "auth-token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        })

        return response
    } catch (error) {
        console.error("Erro no login:", error)
        return NextResponse.json(
            { success: false, error: "Erro ao fazer login. Tente novamente." },
            { status: 500 }
        )
    }
}