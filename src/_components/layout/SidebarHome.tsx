"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SidebarHome() {
    const pathname = usePathname()

    const linkClass = (path: string) =>
        `px-3 py-2 group flex flex-row gap-2.5 items-center rounded-xl transition-normal cursor-pointer
        ${
            pathname === path
                ? "bg-[var(--middleground)]"
                : "bg-[var(--foreground)] hover:bg-[var(--middleground)]"
        }`

    return (
        <aside className="flex flex-col gap-4 w-[18%] h-full p-5 border-r-2 b-2 border-[var(--middleground))]">
            <Link href="/home" className={linkClass("/home")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5.5 group-hover:size-[23px] transition-normal">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                <span>
                    Início
                </span>
            </Link>
            <Link href="/home/profile" className={linkClass("/home/profile")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5.5 group-hover:size-[23px] transition-normal">
                    <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                </svg>
                <span>
                    Perfil
                </span>
            </Link>
            <Link href="/home/settings" className={linkClass("/home/settings")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5.5 group-hover:size-[23px] transition-normal">
                    <path d="M11 10.27 7 3.34"/><path d="m11 13.73-4 6.93"/><path d="M12 22v-2"/><path d="M12 2v2"/><path d="M14 12h8"/><path d="m17 20.66-1-1.73"/><path d="m17 3.34-1 1.73"/><path d="M2 12h2"/><path d="m20.66 17-1.73-1"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m3.34 7 1.73 1"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="12" r="8"/>
                </svg>
                <span>
                    Configurações
                </span>
            </Link>
        </aside>
    )
}