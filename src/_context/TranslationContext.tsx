"use client"

import { TranslationProvider } from "@/_hooks/TranslationProvider"

export function TranslationContext({ children }: { children: React.ReactNode }) {
    return (
        <TranslationProvider>
            {children}
        </TranslationProvider>
    )
}