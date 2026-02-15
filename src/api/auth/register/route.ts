import { NextRequest, NextResponse } from "next/server"
import { isRateLimited } from "@/_lib/security/rateLimit"
import crypto from "crypto"
import { hash } from "bcrypt"
import prisma from "@/server/client"
import {
    validateEmail,
    validatePassword,
    validateUsername,
    validateName,
} from "@/_lib/utils/validation"

export async function POST(req: NextRequest) {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        req.headers.get("x-real-ip") ||
        "unknown"

    const userAgent = req.headers.get("user-agent") || "unknown"

    try {
        const body = await req.json()
        const { name, username, email, password } = body

        if (!name || !username || !email || !password) {
            return NextResponse.json(
                { success: false, error: "Todos os campos são obrigatórios" },
                { status: 400 }
            )
        }

        const fingerprint = crypto
            .createHash("sha256")
            .update(`${email}:${userAgent}`)
            .digest("hex")

        const limited = await isRateLimited(
            ip,
            "verification",
            fingerprint
        )

        if (limited) {
            return NextResponse.json(
                { success: false, error: "Muitas tentativas de registro. Tente novamente mais tarde." },
                { status: 429 }
            )
        }

        const nameValidation = validateName(name)
        if (!nameValidation.valid) {
            return NextResponse.json(
                { success: false, error: nameValidation.errors[0] },
                { status: 400 }
            )
        }

        const usernameValidation = validateUsername(username)
        if (!usernameValidation.valid) {
            return NextResponse.json(
                { success: false, error: usernameValidation.errors[0] },
                { status: 400 }
            )
        }

        const emailValidation = validateEmail(email)
        if (!emailValidation.valid) {
            return NextResponse.json(
                { success: false, error: emailValidation.errors[0] },
                { status: 400 }
            )
        }

        const passwordValidation = validatePassword(password)
        if (!passwordValidation.valid) {
            return NextResponse.json(
                { success: false, error: passwordValidation.errors[0] },
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: email.toLowerCase() }, { username }],
            },
        })

        if (existingUser) {
            if (existingUser.email === email.toLowerCase()) {
                return NextResponse.json(
                    { success: false, error: "Este email já está em uso" },
                    { status: 400 }
                )
            }
            if (existingUser.username === username) {
                return NextResponse.json(
                    { success: false, error: "Este nome de usuário já está em uso" },
                    { status: 400 }
                )
            }
        }

        const hashedPassword = await hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name,
                username,
                email: email.toLowerCase(),
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                createdAt: true,
            },
        })

        return NextResponse.json(
            { success: true, message: "Conta criada com sucesso!"},
            { status: 201 }
        )
    } catch (error) {
        console.error("Erro na API de registro:", error)
        return NextResponse.json(
            { success: false, error: "Erro interno do servidor" },
            { status: 500 }
        )
    }
}