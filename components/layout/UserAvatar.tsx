import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useSession} from "next-auth/react";
import Loader from "@/components/app/Loader";

export const UserAvatar = () => {

    const {data: session, status} = useSession();

    if (status === "loading") {
        return <Loader height="h-10" width="w-10"/>;
    }

    if (!session) return null;

    const getUserFallback = () => {
        const userName = session.user?.name?.split(" ")
        return userName && userName.length > 1
            ? `${userName?.[0][0]}${userName?.[1][0]}`.toUpperCase()
            : `${userName?.[0][0]}${userName?.[0][1]}`.toUpperCase()
    }

    return <Avatar>
        <AvatarImage src={session.user?.image || ""}/>
        <AvatarFallback>{getUserFallback()}</AvatarFallback>
    </Avatar>
}