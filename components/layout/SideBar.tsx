"use client"

import LogoImage from '@/assets/Brain.svg'

import Logo from "./Logo";
import {cn} from "@/lib/utils";
import {sideBarLinks} from "@/data/sideBarLinks";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/context/auth/AuthProvider";

const SideBar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { logout } = useAuth()

    return (
        <>
            <div className="h-full relative bg-gray-900">
                <Logo src={LogoImage} context="Brain" color="text-white"/>

                <div className="flex flex-col mt-6">
                    {sideBarLinks.map((link) => {
                        return <div key={link.name} onClick={() => router.push(link.href)}
                                    className={cn("flex flex-row items-center py-2 pl-6 space-x-4 rounded-md hover:bg-gray-800 cursor-pointer", {
                                        "bg-gray-800": pathname === link.href
                                    })}>
                            <link.icon className={cn("text-2xl text-sky-400", link.color)}/>
                            <span className="text-gray-100">{link.name}</span>
                        </div>

                    })}
                </div>

                <Button className="absolute bottom-5 right-5" onClick={logout}>
                    Logout
                </Button>
            </div>
        </>
    )
}

export default SideBar;