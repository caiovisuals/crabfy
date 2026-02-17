import Link from "next/link"

export default function NotFound() {
    return (
        <div className="size-full flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-center text-3xl font-semibold">Opps! ERRO 404</h2>
                <h3 className="text-center">Não foi possivel acessar essa página. Provavelmente ela não existe.</h3>
            </div>
            <Link href="/" className="px-4 py-1.5 rounded-xl bg-[var(--foreground)] hover:bg-[var(--middleground)] transition-normal">
                Voltar pra felicidade
            </Link>
        </div>
    )
}