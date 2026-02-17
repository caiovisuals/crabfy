"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import HeaderMain from "@/_components/layout/HeaderMain"

export default function Register() {
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
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        if (form.password !== form.confirmPassword) {
            setError("As senhas não coincidem")
            return
        }

        try {
            setLoading(true)

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    username: form.username,
                    email: form.email,
                    password: form.password,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Erro ao criar conta")
                return
            }

            setSuccess("Conta criada com sucesso!")
            setForm({
                name: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            })

            setSuccess(data.message)
            router.push("/home")
        } catch (err) {
            setError("Erro inesperado. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col">
            <HeaderMain/>
            <div className="flex flex-col gap-6 items-center justify-center w-full h-[calc(100vh-10rem)]">
                <h1 className="text-3xl">Criar Conta</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex flex-row gap-5">
                        <div onClick={() => signIn("github", { callbackUrl: "/home" })} className="w-[50%] flex flex-row items-center justify-center gap-2 bg-[#151515] hover:bg-[#202020] border-2 border-[#232323] p-4 rounded-xl transition-normal cursor-pointer">
                            <img src="/auth-opitons/github.png" alt="GitHub" className="size-5" loading="lazy" draggable="false" />
                            <span>GitHub</span>
                        </div>
                        <div onClick={() => signIn("google", { callbackUrl: "/home" })} className="w-[50%] flex flex-row items-center justify-center gap-2 bg-[#151515] hover:bg-[#202020] border-2 border-[#232323] p-4 rounded-xl transition-normal cursor-pointer">
                            <img src="/auth-opitons/google.png" alt="Google" className="size-5" loading="lazy" draggable="false" />
                            <span>Google</span>
                        </div>
                    </div>
                    <div className="w-full h-0.5 bg-[var(--middleground)] my-3"/>
                    <div className="flex flex-col gap-1">
                        <label>Nome</label>
                        <input name="name" value={form.name} onChange={handleChange} type="text" className="input-authcredentials"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Nome de Usuário</label>
                        <input name="username" value={form.username} onChange={handleChange} type="text" className="input-authcredentials"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>E-mail</label>
                        <input name="email" value={form.email} onChange={handleChange} type="email" className="input-authcredentials"></input>
                    </div>
                    <div className="flex flex-col gap-1 relative">
                        <label>Senha</label>
                        <input name="password" value={form.password} onChange={handleChange} type={showPassword ? "text" : "password"} className="input-authcredentials"></input>
                        <button type="button"onClick={() => setShowPassword(!showPassword)} className="absolute group right-2.5 top-9 flex items-center justify-center bg-transparent outline-none" tabIndex={-1}>
                            <svg
                                viewBox="0 0 24 24"
                                width={20}
                                height={20}
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="group-hover:scale-[1.05] transition-fast"
                            >
                                {showPasswordIcon()}
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Confirmar Senha</label>
                        <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type={showPassword ? "text" : "password"} className="input-authcredentials"></input>
                    </div>
                    <button type="submit" disabled={loading} className="text-lg px-5 py-2 rounded-xl bg-[var(--middleground)] hover:bg-[var(--mainground)] transition-normal cursor-pointer mt-2">
                        {loading ? "Criando" : "Criar"}
                    </button>
                    <div className="text-center flex flex-col items-center justify-center">
                        <p>Ao criar sua conta, você concorda com os <a className="text-link" href="/terms">Termos de Uso</a> do Crabfy.</p>
                        <p>Já tem uma conta? <a className="text-link" href="/login">Faça login.</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}