export default function Profile() {
    return (
        <div className="size-full flex flex-col p-5">
            <div className="w-full h-35 rounded-t-3xl rounded-b-2xl transition-normal" style={{ background: "linear-gradient(25deg, var(--middleground), #4f46e5)" }}/>
            <div className="size-full flex flex-row gap-5 -mt-6">
                <img src="/profile.jpg" alt="User Avatar" className="size-30 rounded-full bg-red-800 transition-normal border-8 border-[var(--background)] object-cover cursor-pointer" draggable="false" />
                <div className="flex flex-col items-start justify-center mt-5">
                    <span className="text-2xl font-semibold leading-tight">Caio Oliveira</span>
                    <span className="text-lg leading-tight">@caiote</span>
                </div>
            </div>
        </div>
    )
}