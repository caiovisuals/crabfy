import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { JWT } from "next-auth/jwt"
import prisma from "@/server/client"
import crypto from "crypto"

interface ExtendedUser {
    id: string
    name: string
    email: string
    username: string
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                // Buscar usuário pelo email
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (!user) return null

                // Verificar senha
                const isValid = await compare(credentials.password, user.password)
                if (!isValid) return null

                // Retornar usuário simplificado para o JWT
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                } as ExtendedUser
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // JWT callback: adicionar informações extras ao token
        async jwt({ token, user }) {
            if (user) {
                token.user = user as ExtendedUser
            }
            return token
        },

        // Session callback: expor dados do token para o cliente
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user
            }
            return session
        },
    }
}