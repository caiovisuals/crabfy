import HeaderMain from "@/_components/layout/HeaderMain"
import FooterMain from "@/_components/layout/FooterMain"

export default function LandingPage() {
    return (
        <div className="flex flex-col size-full items-center">
            <HeaderMain/>
            <section id="hero" className="flex flex-col items-center justify-center w-full h-[calc(100vh-10rem)]">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="flex flex-row gap-2 py-2 px-4 border-2 border-[var(--middleground)] hover:bg-[var(--foreground)] rounded-full w-fit transition-normal">
                        <div className="flex flex-row">
                            <img src="/profile.jpg" alt="Avatar do Aluno" className="size-6 border-2 border-[var(--background)] rounded-full object-cover" draggable="false" />
                            <img src="/profile.jpg" alt="Avatar do Aluno" className="size-6 border-2 border-[var(--background)] rounded-full object-cover -ml-1" draggable="false" />
                            <img src="/profile.jpg" alt="Avatar do Aluno" className="size-6 border-2 border-[var(--background)] rounded-full object-cover -ml-1" draggable="false" />
                        </div>
                        <span className="whitespace-nowrap">Contando com + de 5 mil alunos</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5 w-[60%]">
                        <h1 className="text-center text-6xl font-semibold">Começe a sua carreira em <span>programação</span> e <span>desenvolvimento</span></h1>
                        <h2 className="text-center text-2xl text-[var(--subtext)]">Acesse agora nossos cursos e comece a aprender as tecnologias mais usadas no mercado de tecnologia, completamente sem custo algum!</h2>
                    </div>
                </div>
            </section>
            <section id=""></section>
            <section id=""></section>
            <section id=""></section>
            <section id="faq" className="w-full bg-[var(--foreground)] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-center text-3xl font-semibold">Perguntas frequentes</h2>
                    <h3 className="text-center text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi reprehenderit magni optio.</h3>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-2">

                    </div>
                    <div className="flex flex-col gap-2">

                    </div>
                </div>
            </section>
            <FooterMain/>
        </div>
    )
}
