"use client"

import { SessionProvider } from "next-auth/react"

export function AuthContext({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}