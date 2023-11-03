"use client"

import Logo from "./Logo";
import {cn} from "@/lib/utils";
import {sideBarLinks} from "@/data/sideBarLinks";
import {usePathname, useRouter} from "next/navigation";

const SideBar = () => {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <>
            <div className="h-full relative bg-gray-900">
                <Logo/>

                <div className="flex flex-col mt-6">
                    {sideBarLinks.map((link) => {
                        return <div key={link.name} onClick={() => router.push(link.href)}
                                    className={cn("flex flex-row items-center py-2 pl-6 space-x-4 rounded-md hover:bg-gray-800 cursor-pointer", {
                                        "bg-gray-800": pathname === link.href
                                    })}>
                            <link.icon className={cn("text-2xl text-sky-400")}/>
                            <span className="text-gray-100">{link.name}</span>
                        </div>

                    })}
                </div>
            </div>
        </>
    )
}

export default SideBar;