import HeaderHome from "@/_components/layout/HeaderHome"

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <HeaderHome/>
            {children}
        </div>
    )
}
