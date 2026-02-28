"use client"

import { useState } from "react"
import { useUser } from "@/_hooks/useUser"

export default function Profile() {
    const { user, loading } = useUser()
    const [ isEditing, setIsEditing ] = useState(false)

    if (loading) {
        return (
            <div className="size-full flex flex-col p-5">
                <div className="w-full h-35 rounded-t-3xl rounded-b-2xl bg-[var(--foreground)] animate-pulse" />
                <div className="size-full flex flex-row gap-5 -mt-6">
                    <div className="size-30 rounded-full bg-[var(--middleground)] animate-pulse border-8 border-[var(--background)]" />
                    <div className="flex flex-col items-start justify-center mt-5 gap-2">
                        <div className="h-7 w-48 bg-[var(--foreground)] rounded-lg animate-pulse" />
                        <div className="h-5 w-32 bg-[var(--foreground)] rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="size-full flex flex-col p-5">
            <div className="w-full h-35 rounded-t-3xl rounded-b-2xl transition-normal" style={{ background: "linear-gradient(25deg, var(--middleground), #4f46e5)" }}/>
            <div className="size-full flex flex-row items-center justify-between gap-5 -mt-6">
                <div className="flex flex-row gap-5">
                    <img src="/profile.jpg" alt="User Avatar" className="size-30 rounded-full bg-red-800 transition-normal border-8 border-[var(--background)] object-cover cursor-pointer" draggable="false" />
                    <div className="flex flex-col items-start justify-center mt-5">
                        {!isEditing ? (
                            <span className="text-2xl font-semibold leading-tight">{user?.name || "Nome legal"}</span>
                        ) : (
                            <input type="text" placeholder="Nome" value={user?.name} disabled={!isEditing} className="py-1 px-3 text-2xl bg-[var(--foreground)] rounded-xl mb-1 outline-none"/>
                        )}
                        <span className="text-lg leading-tight">@{user?.username || "nome-de-usuario"}</span>
                    </div>
                </div>
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 flex flex-row items-center justify-center gap-2.5 bg-[var(--foreground)] hover:bg-[var(--middleground)] rounded-xl transition-normal cursor-pointer">
                    Editar Perfil
                </button>
            </div>
        </div>
    )
}