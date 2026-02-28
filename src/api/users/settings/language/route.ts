import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/_lib/utils/auth-middleware"
import prisma from "@/server/client"

export async function GET(req: NextRequest) {
    const auth = await requireAuth(req)
    if (!auth.success) {
        return auth.response
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: auth.user.userId },
            select: { language: true },
        })

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Usuário não encontrado" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: true, language: user.language ?? "PORTUGUESE" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Erro ao buscar idioma:", error)
        return NextResponse.json(
            { success: false, error: "Erro interno do servidor" },
            { status: 500 }
        )
    }
}

// POST - atualizar idioma do usuário
export async function POST(req: NextRequest) {
    const auth = await requireAuth(req)
    if (!auth.success) {
        return auth.response
    }

    try {
        const body = await req.json()
        const { language } = body

        if (!["PORTUGUESE", "ENGLISH"].includes(language)) {
            return NextResponse.json(
                { success: false, error: "Idioma inválido" },
                { status: 400 }
            )
        }

        await prisma.user.update({
            where: { id: auth.user.userId },
            data: { language },
        })

        return NextResponse.json(
            { success: true, message: "Idioma atualizado com sucesso!" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Erro ao atualizar idioma:", error)
        return NextResponse.json(
            { success: false, error: "Erro interno do servidor" },
            { status: 500 }
        )
    }
}