"use client"

import { useState } from "react"

export default function Settings() {
    const [selected, setSelected] = useState("myaccount")

    const buttonClasses = (key: string) => 
        `flex flex-row gap-2 items-center bg-[var(--foreground)] text-left px-2 py-1.5 rounded-xl transition-normal cursor-pointer
        ${selected === key 
            ? "bg-[var(--middleground)] text-[var(--text)]" 
            : "hover:bg-[var(--middleground)]/40"
        }`

    function renderSettingsFeed() {
        switch (selected) {
            case "myaccount":
                return <div>Configurações da Conta</div>
            case "devices":
                return <div>Dispositivos</div>
            case "notifications":
                return <div>Configurações de Notificações</div>
            case "apparence":
                return <div>Configurações de Tema</div>
            case "accessibility":
                return <div>Configurações de Acessibilidade</div>
            case "exit":
                return <div>Sair</div>
        }
    }

    return (
        <div className="size-full p-5">
            <h3 className="text-2xl">Configurações</h3>
            <div className="w-[45%] flex flex-row gap-3">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[var(--subtext)] text-sm">Configurações do Usuário</span>
                        <button className={buttonClasses("myaccount")} onClick={() => setSelected("myaccount")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                            </svg>
                            Minha Conta
                        </button>
                        <button className={buttonClasses("devices")} onClick={() => setSelected("devices")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/>
                            </svg>
                            Dispositivos
                        </button>
                        <button className={buttonClasses("notifications")} onClick={() => setSelected("notifications")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
                            </svg>
                            Notificações
                        </button>
                    </div>
                    <div className="w-full h-0.5 bg-[var(--middleground)] my-1"/>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[var(--subtext)] text-sm">Configurações da Plataforma</span>
                        <button className={buttonClasses("apparence")} onClick={() => setSelected("apparence")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="7" height="18" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/>
                            </svg>
                            Aparências
                        </button>
                    </div>
                    <div className="w-full h-0.5 bg-[var(--middleground)] my-1"/>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[var(--subtext)] text-sm">Atividade</span>
                        <button className={buttonClasses("accessibility")} onClick={() => setSelected("accessibility")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/>
                            </svg>
                            Acessibilidade
                        </button>
                    </div>
                    <div className="w-full h-0.5 bg-[var(--middleground)] my-1"/>
                    <button className={buttonClasses("exit")} onClick={() => setSelected("exit")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        </svg>
                        Sair
                    </button>
                </div>
                <div className="w-[55%] flex">
                    {renderSettingsFeed()}
                </div>
            </div>
        </div>
    )
}