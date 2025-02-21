import Link from "next/link";
import { ReactNode } from "react";

export default function layout({children} : {children: ReactNode}){
    return <>
        <Navbar />
        {children}
    </>
}


function Navbar(){
    return <header className="flex h-12 shadow bg-background z-10">
        <nav className="flex gap-4 container">
            <Link className="mr-auto text-lg hover:underline px-2" href="/">Home</Link>
        </nav>
    </header>
}