"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import HeaderMain from "@/_components/layout/HeaderMain"

export default function Login() {
    const [ loading, setLoading ] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [showPassword, setShowPassword] = useState(false)

    const showPasswordIcon = () => {
        if (showPassword) {
            return (
                <>
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                    <circle cx="12" cy="12" r="3"/>
                </>
            )
        } else {
            return (
                <>
                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
                    <path d="m2 2 20 20"/>
                </>
            )
        }
    }

    const router = useRouter()

    const [form, setForm] = useState({
        emailOrUsername: "",
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
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Erro ao fazer login")
                setLoading(false)
                return
            }

            setSuccess(data.message)
        } catch (err) {
            setError("Erro inesperado. Tente novamente.")
        } finally {
            setLoading(false)
            router.push("/home")
        }
    }

    return (
        <div className="flex flex-col">
            <HeaderMain/>
            <div className="flex flex-col gap-6 items-center justify-center w-full h-[calc(100vh-10rem)]">
                <h1 className="text-3xl">Fazer Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label>Email ou Nome de Usuário</label>
                        <input name="name" value={form.emailOrUsername} onChange={handleChange} type="text" className="input-authcredentials"></input>
                    </div>
                    <div className="flex flex-col gap-1 relative">
                        <label>Senha</label>
                        <input name="password" value={form.password} onChange={handleChange} type={showPassword ? "text" : "password"} className="input-authcredentials"></input>
                        <button type="button"onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-9 flex items-center justify-center bg-transparent outline-none" tabIndex={-1}>
                            <svg
                                viewBox="0 0 24 24"
                                width={20}
                                height={20}
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {showPasswordIcon()}
                            </svg>
                        </button>
                    </div>
                    <button type="submit" disabled={loading} className="text-lg px-5 py-2 rounded-xl bg-[var(--middleground)] hover:bg-[var(--mainground)] transition-normal cursor-pointer mt-2">
                        {loading ? "Logando" : "Logar"}
                    </button>
                    <div className="text-center flex flex-col items-center justify-center">
                        <p>Ainda não tem uma conta? <a className="text-link" href="/register">Crie a sua.</a></p>
                        <p>Esqueceu sua credencial? <a className="text-link" href="/forgot-passoword">Redefina sua senha.</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}