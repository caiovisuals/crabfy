"use client"

import { useState } from "react"
import HeaderMain from "@/_components/layout/HeaderMain"

export default function Login() {
    const [ loading, setLoading ] = useState(false)

    return (
        <div className="flex flex-col">
            <HeaderMain/>
            <div className="flex flex-col gap-6 items-center justify-center w-full h-[calc(100vh-10rem)]">
                <h1 className="text-3xl">Fazer Login</h1>
                <form className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label>Email ou Nome de Usuário</label>
                        <input type="text" className="input-authcredentials"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Senha</label>
                        <input type="password" className="input-authcredentials"></input>
                    </div>
                    <button className="text-lg px-5 py-2 rounded-xl bg-[var(--middleground)] hover:bg-[var(--mainground)] transition-normal cursor-pointer mt-2">
                        {loading ? "Logando" : "Logar"}
                    </button>
                    <div className="flex flex-col items-center justify-center">
                        <p>Ainda não tem uma conta? <a className="text-link" href="/register">Crie a sua.</a></p>
                        <p>Esqueceu sua credencial? <a className="text-link" href="/forgot-passoword">Redefina sua senha.</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}