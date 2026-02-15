import { NextRequest, NextResponse } from "next/server"
import prisma from "@/server/client"
import { getClientIP } from "@/_lib/security/ip"
import { isRateLimited } from "@/_lib/security/rateLimit"
import { generateResetToken } from "@/_lib/utils/jwt"
import { validateEmail } from "@/_lib/utils/validation"

export async function POST(req: NextRequest) {
    const ip = getClientIP(req)

    try {
        const limited = await isRateLimited(ip, "password_reset")
        if (limited) {
            return NextResponse.json(
                { success: false, error: "Muitas solicitações. Tente novamente mais tarde." },
                { status: 429 }
            )
        }

        const body = await req.json()
        const { email } = body

        const emailValidation = validateEmail(email)
        if (!emailValidation.valid) {
            return NextResponse.json(
                { success: false, error: emailValidation.errors[0] },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        })

        // IMPORTANTE: Por segurança, sempre retorne sucesso mesmo se o email não existir
        // Isso previne que atacantes descubram quais emails estão cadastrados
        if (!user) {
            return NextResponse.json(
                { success: true, message: "Se o email existir, você receberá instruções para redefinir sua senha." },
                { status: 200 }
            )
        }

        // Gerar novo token
        const resetToken = generateResetToken()
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 1) // Token válido por 1 hora

        // TODO: Enviar email com o link de reset
        // const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
        // await sendResetPasswordEmail(user.email, user.name, resetLink)

        console.log(`Token de reset para ${user.email}: ${resetToken}`)
        console.log(`Link: http://localhost:3000/reset-password?token=${resetToken}`)

        return NextResponse.json(
            { success: true, message: "Se o email existir, você receberá instruções para redefinir sua senha." },
            { status: 200 }
        )
    } catch (error) {
        console.error("Erro ao solicitar reset de senha:", error)
        return NextResponse.json(
            { success: false, error: "Erro ao processar solicitação. Tente novamente." },
            { status: 500 }
        )
    }
}