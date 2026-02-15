import Link from "next/link"

export default function HeaderMain() {
    return (
        <header className="flex flex-row items-center justify-between w-full p-5 gap-4 top-4 rounded-full">
            <div className="flex flex-row gap-14">
                <Link href="/">
                    logo
                </Link>
                <nav className="flex flex-row gap-4 xl:gap-6">
                    <Link href="/about" className="hover:text-[var(--subtext)] transition-fast">Sobre</Link>
                    <Link href="/education" className="hover:text-[var(--subtext)] transition-fast">Ensino</Link>
                    <Link href="/courses" className="hover:text-[var(--subtext)] transition-fast">Cursos</Link>
                </nav>
            </div>
            <div className="flex flex-row gap-2">
                <Link href="/login" className="px-4 py-1.5 rounded-xl hover:bg-[var(--middleground)] transition-normal">Login</Link>
                <Link href="/register" className="px-4 py-1.5 rounded-xl bg-[var(--middleground)] hover:bg-[var(--mainground)] transition-normal">Criar Conta</Link>
            </div>
        </header>
    )
}
