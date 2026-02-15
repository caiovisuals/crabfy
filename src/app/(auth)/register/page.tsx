"use client"

import { useState } from "react"
import HeaderMain from "@/_components/layout/HeaderMain"

export default function Register() {
    const [ loading, setLoading ] = useState(false)

    return (
        <div className="flex flex-col">
            <HeaderMain/>
            <div className="flex flex-col gap-6 items-center justify-center w-full h-[calc(100vh-10rem)]">
                <h1 className="text-3xl">Criar Conta</h1>
                <form className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label>Nome</label>
                        <input type="text" className="input-authcredentials"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Nome de Usuário</label>
                        <input type="text" className="input-authcredentials"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>E-mail</label>
                        <input type="email" className="input-authcredentials"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Senha</label>
                        <input type="password" className="input-authcredentials"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Confirmar Senha</label>
                        <input type="password" className="input-authcredentials"></input>
                    </div>
                    <button className="text-lg px-5 py-2 rounded-xl bg-[var(--middleground)] hover:bg-[var(--mainground)] transition-normal cursor-pointer mt-2">
                        {loading ? "Criando" : "Criar"}
                    </button>
                    <p>Ao criar sua conta, você concorda com os <a className="text-link" href="/terms">Termos de Uso</a> do Crabfy.</p>
                </form>
            </div>
        </div>
    )
}