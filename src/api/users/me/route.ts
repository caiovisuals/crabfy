import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/_lib/utils/auth-middleware"
import prisma from "@/server/client"

export async function GET(req: NextRequest) {
    // Require authentication
    const auth = await requireAuth(req)
    if (!auth.success) {
        return auth.response
    }

    try {
        // Get user from database
        const user = await prisma.user.findUnique({
            where: {
                id: auth.user.userId,
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                bio: true,
                avatarUrl: true,
                role: true,
                xp: true,
                level: true,
                visibility: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                    },
                },
            },
        })

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Usuário não encontrado" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                user: {
                    ...user,
                    followersCount: user._count.followers,
                    followingCount: user._count.following,
                },
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Erro ao buscar usuário:", error)
        return NextResponse.json(
            { success: false, error: "Erro ao buscar informações do usuário" },
            { status: 500 }
        )
    }
}