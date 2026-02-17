import HeaderHome from "@/_components/layout/HeaderHome"
import SidebarHome from "@/_components/layout/SidebarHome"

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="size-full">
            <HeaderHome/>
            <div className="flex flex-row h-full">
                <SidebarHome/>
                {children}
            </div>
        </div>
    )
}
