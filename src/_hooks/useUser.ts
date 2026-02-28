"use client"

import { useState, useEffect } from "react"

export interface User {
    id: string
    name: string
    username: string
    email: string
    bio: string | null
    avatarUrl: string | null
    role: string
    xp: number
    level: number
    visibility: string
    followersCount: number
    followingCount: number
    createdAt: string
    updatedAt: string
}

interface UseUserReturn {
    user: User | null
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useUser(): UseUserReturn {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [trigger, setTrigger] = useState(0)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)
                setError(null)

                const res = await fetch("/api/users/me")

                if (res.status === 401) {
                    setUser(null)
                    return
                }

                if (!res.ok) {
                    throw new Error("Erro ao buscar dados do usuário")
                }

                const data = await res.json()

                if (data.success) {
                    setUser(data.user)
                } else {
                    throw new Error(data.error || "Erro desconhecido")
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido")
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [trigger])

    const refetch = () => setTrigger(prev => prev + 1)

    return { user, loading, error, refetch }
}