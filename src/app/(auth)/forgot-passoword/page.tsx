"use client"

import { useState } from "react"
import HeaderMain from "@/_components/layout/HeaderMain"

export default function ForgotPassoword() {
    const [ loading, setLoading ] = useState(false)

    return (
        <div className="flex flex-col">
            <HeaderMain/>
            <div className="flex flex-col gap-6 items-center justify-center w-full h-[calc(100vh-10rem)]">
                <h1 className="text-3xl">Esqueci a Senha</h1>
                <form className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label>E-mail</label>
                        <input type="email" className="input-authcredentials"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Senha</label>
                        <input type="password" className="input-authcredentials"></input>
                    </div>
                    <button className="text-lg px-5 py-2 rounded-xl bg-[var(--middleground)] hover:bg-[var(--mainground)] transition-normal cursor-pointer mt-2">
                        {loading ? "Trocando" : "Trocar Senha"}
                    </button>
                    <p>Lembrou da sua senha? <a className="text-link" href="/login">Faça login.</a></p>
                </form>
            </div>
        </div>
    )
}