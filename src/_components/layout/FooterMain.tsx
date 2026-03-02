import Link from "next/link"

export default function FooterMain() {
    const linkClasses = "hover:text-[var(--subtext)] transition-normal"

    return (
        <footer className="px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-8 md:py-12 flex flex-col w-full">
            <div className="flex flex-row gap-15">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[var(--subtext)]">Formações</span>
                    <Link href="" className={linkClasses}>Cursos</Link>
                    <Link href="" className={linkClasses}>Ensino</Link>
                    <Link href="" className={linkClasses}>Carreiras</Link>
                    <Link href="" className={linkClasses}>Todos os Conteúdos</Link>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[var(--subtext)]">Recursos</span>
                    <Link href="" className={linkClasses}>Financie</Link>
                    <Link href="" className={linkClasses}>Ajude a Desenvolver</Link>
                    <Link href="" className={linkClasses}>Ensine na Crabfy</Link>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[var(--subtext)]">Sobre</span>
                    <Link href="" className={linkClasses}>Quem somos</Link>
                    <Link href="" className={linkClasses}>Termos de Uso</Link>
                    <Link href="" className={linkClasses}>Políticas</Link>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[var(--subtext)]">Suporte</span>
                    <Link href="" className={linkClasses}>Central de Ajuda</Link>
                    <Link href="" className={linkClasses}>Fale Conosco</Link>
                </div>
            </div>
            <div className="w-full h-0.5 bg-[var(--middleground)] my-3 md:my-5"/>
            <div className="flex flex-row gap-5 items-center justify-between">
                <div id="logo">
                    logo
                </div>
                <div>
                    redes
                </div>
            </div>
        </footer>
    )
}
