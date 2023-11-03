"use client";

import {ReactNode} from "react";

import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";


const DashboardLayout = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex gap-3 md:gap-0 md:flex-row h-screen overflow-hidden">
            <div className="hidden h-full md:flex md:flex-col md:w-72 z-50">
                <SideBar/>
            </div>
            <main className="flex flex-col w-full h-screen max-h-screen">
                <NavBar/>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;