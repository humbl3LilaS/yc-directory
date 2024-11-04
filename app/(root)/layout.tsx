import {ReactNode} from "react";
import Navbar from "@/components/Navbar";
import {Toaster} from "@/components/ui/toaster";

export default function Layout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <>
            <Navbar/>
            <main>
                {children}
            </main>
            <Toaster/>
        </>
    )
}