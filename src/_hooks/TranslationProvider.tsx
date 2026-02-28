"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import ptBR from "@/_lib/translations/pt-BR.json"
import enUS from "@/_lib/translations/en-US.json"

type Language = "PORTUGUESE" | "ENGLISH"

type Translations = typeof ptBR

interface TranslationContextType {
    t: Translations
    language: Language
    setLanguage: (lang: Language) => void
    isLoading: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const translations: Record<Language, Translations> = {
    PORTUGUESE: ptBR,
    ENGLISH: enUS,
}

export function TranslationProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("PORTUGUESE")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const res = await fetch("/api/users/settings/language")
                if (res.status === 401) {
                    return
                }
                if (!res.ok) {
                    const data = await res.json()

                    if (data.language) {
                        setLanguageState(data.language)
                    }
                }
            } catch (err) {
                console.error("Erro ao buscar idioma:", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchLanguage()
    }, [])

    const setLanguage = async (newLanguage: Language) => {
        if (newLanguage === language) return

        const previousLanguage = language
        setLanguageState(newLanguage)

        try {
            const res = await fetch("/api/users/settings/language", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language: newLanguage }),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || "Erro na API")
            }
        } catch (err) {
            setLanguageState(previousLanguage)
            throw err
        }
    }

    const value = {
        t: translations[language],
        language,
        setLanguage,
        isLoading,
    }

    if (isLoading) {
        return null
    }

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    )
}

export function useTranslation() {
    const context = useContext(TranslationContext)
    if (context === undefined) {
        throw new Error("useTranslation deve ser usado dentro de um TranslationProvider!")
    }
    return context
}