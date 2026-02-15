import type { Metadata } from "next"
import { TranslationContext } from "@/_context/TranslationContext"
import { AuthContext } from "@/_context/AuthContext"
import { Outfit } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
})

export const metadata: Metadata = {
    title: "Crabfy - Aprenda qualquer linguagem de programação de forma divertida!",
    description: "Vamos aprender lógica de programação de forma fácil e divertida? Estude, aprenda e crie a qualquer momento.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-br">
            <body className={`${outfit.className}`}>
                <AuthContext>
                    <TranslationContext>
                        {children}
                    </TranslationContext>
                </AuthContext>
            </body>
        </html>
    )
}
