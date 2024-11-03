import {ReactNode} from "react";
import Navbar from "@/components/Navbar";

export default function Layout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <>
            <Navbar/>
            <main>
                {children}
            </main>
        </>
    )
}