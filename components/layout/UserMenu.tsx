"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {UserAvatar} from "@/components/layout/UserAvatar";

import menuData from "@/data/userMenu";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Loader from "@/components/app/Loader";
import React from "react";

export const UserMenu = () => {

    const router = useRouter()
    const {data: session, status} = useSession();

    const handleNavigate = async (label: string, path: string) => {
        if (label !== "sign-out") return router.push(path)

        try {
            await signOut({
                redirect: false,
            })

            router.push(path)
        } catch (error) {
            console.log(error)
        } finally {
            router.refresh()
        }
    }

    if (status === "loading") {
        return <Loader height="h-10" width="w-10"/>;
    }

    if (!session) return null;

    return <DropdownMenu>
        <DropdownMenuTrigger className="border-0 focus:ring-0 focus:outline-none">
            <UserAvatar
                userName={session?.user?.name!}
                userImage={session?.user?.image!}
            />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 mr-3.5">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            {menuData.map((item) => {
                return <DropdownMenuItem
                    key={item.label}
                    onClick={() => handleNavigate(item.label, item.link)}
                    className="flex gap-x-2 items-center text-zinc-500"
                >
                    <item.icon className="w-5 h-5" />
                    {item.value}
                </DropdownMenuItem>
            })}
        </DropdownMenuContent>
    </DropdownMenu>
}