"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import HeaderMain from "@/_components/layout/HeaderMain"

export default function ForgotPassoword() {
    const [ loading, setLoading ] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const router = useRouter()

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erro ao enviar solicitação.")
            }

            setSuccess(data.message)
        } catch (err) {
            setError("Erro inesperado. Tente novamente.")
        } finally {
            setLoading(false)
            router.push("/login")
        }
    }

    return (
        <div className="flex flex-col">
            <HeaderMain/>
            <div className="flex flex-col gap-6 items-center justify-center w-full h-[calc(100vh-10rem)]">
                <h1 className="text-3xl">Esqueci a Senha</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label>E-mail</label>
                        <input name="email" value={form.email} onChange={handleChange} type="email" className="input-authcredentials"></input>
                    </div>
                    <button type="submit" disabled={loading} className="text-lg px-5 py-2 rounded-xl bg-[var(--middleground)] hover:bg-[var(--mainground)] transition-normal cursor-pointer mt-2">
                        {loading ? "Trocando" : "Trocar Senha"}
                    </button>
                    <p>Lembrou da sua senha? <a className="text-link" href="/login">Faça login.</a></p>
                </form>
            </div>
        </div>
    )
}