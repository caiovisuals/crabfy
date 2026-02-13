import { NextRequest, NextResponse } from "next/server"
import { isRateLimited } from "@/_lib/security/rateLimit"
import crypto from "crypto"

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
                {
                    success: false,
                    error: "Todos os campos são obrigatórios",
                },
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
                {
                    success: false,
                    error: "Muitas tentativas de registro. Tente novamente mais tarde.",
                },
                { status: 429 }
            )
        }

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