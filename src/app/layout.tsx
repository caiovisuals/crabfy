import type { Metadata } from "next"
import { TranslationContext } from "@/_context/TranslationContext"
import { AuthContext } from "@/_context/AuthContext"
import "./globals.css"

export const metadata: Metadata = {
    title: "Crabfy - Aprenda qualquer linguagem de programação de forma divertida!",
    description: "Vamos aprender lógica de programação de forma fácil e divertida? Estude, aprenda e crie a qualquer momento.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-br">
            <body>
                <AuthContext>
                    <TranslationContext>
                        {children}
                    </TranslationContext>
                </AuthContext>
            </body>
        </html>
    )
}
