"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function HeaderHome() {
    const [isSearchModalVisible,setIsSearchModalVisible] = useState(false)
    const [isProfileModalVisible,setIsProfileModalVisible] = useState(false)

    const profileModalRef = useRef<HTMLDivElement>(null)

    const profileContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                isProfileModalVisible &&
                profileContainerRef.current &&
                profileModalRef.current &&
                !profileContainerRef.current.contains(event.target as Node) &&
                !profileModalRef.current.contains(event.target as Node)
            ) {
                setIsProfileModalVisible(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isProfileModalVisible])

    return (
        <header className="flex flex-row w-full items-center justify-between w-full p-5 gap-4 border-b-2 border-[var(--middleground))]">
            <div className="w-[33%]">
                <Link href="/home">
                    logo
                </Link>
            </div>
            <div onClick={() => setIsSearchModalVisible(true)} className="w-[33%] flex flex-row items-center gap-4 p-3 bg-[var(--foreground)] hover:bg-[var(--middleground)] rounded-xl transition-normal cursor-pointer">
                <svg stroke="var(--subtext)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20" width="24" height="24">
                    <path d="M14.5833 14.5835L18.3333 18.3335"/>
                    <path d="M16.6667 9.1665C16.6667 5.02437 13.3088 1.6665 9.16666 1.6665C5.02452 1.6665 1.66666 5.02437 1.66666 9.1665C1.66666 13.3087 5.02452 16.6665 9.16666 16.6665C13.3088 16.6665 16.6667 13.3087 16.6667 9.1665Z"/>
                </svg>
                <span className="text-[var(--subtext)]">Busque por assuntos e tópicos</span>
            </div>
            <div className="w-[33%] flex flex-row items-center justify-end gap-4">
                <div></div>
                <div ref={profileContainerRef}>
                    <img src="/profile.jpg" alt="User Avatar" onClick={() => setIsProfileModalVisible(true)} className={`size-10 rounded-full bg-red-800 transition-normal object-cover cursor-pointer ${isProfileModalVisible ? "brightness-75" : ""}`} draggable="false" />
                </div>
            </div>
            <div ref={profileModalRef} className={`absolute right-5 top-18.5 max-w-130 w-fit p-4 border-2 border-[var(--middleground))] rounded-xl bg-[var(--background)] modal-shadow transition-normal ${isProfileModalVisible ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95"}`}>
                <div className="flex flex-row gap-4 items-center">
                    <img src="/profile.jpg" alt="User Avatar" className="size-10 rounded-full bg-red-800 object-cover cursor-pointer" draggable="false" />
                    <div className="flex flex-col justify-center">
                        <span className="whitespace-nowrap text-lg font-semibold leading-tight">Caio Santos</span>
                        <span className="whitespace-nowrap truncate leading-tight">caioliveira@gmail.com</span>
                    </div>
                    <Link href="/home/profile" onClick={() => setIsProfileModalVisible(false)} className="px-4 py-1.5 rounded-xl bg-[var(--foreground)] hover:bg-[var(--middleground)] transition-normal">
                        Ver Perfil
                    </Link>
                </div>
            </div>
            <div onClick={() => setIsSearchModalVisible(false)} className={`modal ${isSearchModalVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div onClick={(e) => e.stopPropagation()} className={`relative flex flex-col gap-2 p-4 rounded-xl bg-[var(--background)] modal-shadow transition-normal ${isSearchModalVisible ? "scale-100" : "scale-95"}`}>
                    <div className="flex flex-row items-center gap-4 p-2">
                        <svg stroke="var(--subtext)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20" width="24" height="24">
                            <path d="M14.5833 14.5835L18.3333 18.3335"/>
                            <path d="M16.6667 9.1665C16.6667 5.02437 13.3088 1.6665 9.16666 1.6665C5.02452 1.6665 1.66666 5.02437 1.66666 9.1665C1.66666 13.3087 5.02452 16.6665 9.16666 16.6665C13.3088 16.6665 16.6667 13.3087 16.6667 9.1665Z"/>
                        </svg>
                        <input placeholder="Busque por assuntos e tópicos" className="py-2 px-3 min-w-100 outline-none"></input>
                    </div>
                    <div className="w-full h-0.5 bg-[var(--middleground)]"/>
                    <div className="p-2">

                    </div>
                </div>
            </div>
        </header>
    )
}
