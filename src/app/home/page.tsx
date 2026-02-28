"use client"

import { useUser } from "@/_hooks/useUser"

export default function Home() {
    const { user, loading } = useUser()

    const firstName = user?.name?.split(" ")[0] || ""

    return (
        <div className="flex flex-col size-full p-5">
            {loading ? (
                <>
                    <div className="h-8 w-96 bg-[var(--foreground)] rounded-xl animate-pulse mb-2" />
                    <div className="h-5 w-80 bg-[var(--foreground)] rounded-xl animate-pulse" />
                </>
            ) : (
                <>
                    <h3 className="text-2xl">
                        {user ? (
                            <>
                                Olá, <span className="font-semibold">{firstName}</span>! Sua jornada em tecnologia começa aqui
                            </>
                        ) : (
                            "Olá! Sua jornada em tecnologia começa aqui"
                        )}
                    </h3>
                    <span className="text-lg">Explore cursos atualizados e desenvolva habilidades valorizadas pelo mercado.</span>
                </>
            )}
        </div>
    )
}
