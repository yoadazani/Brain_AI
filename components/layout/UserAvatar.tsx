import React, {FC} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useSession} from "next-auth/react";
import Loader from "@/components/app/Loader";
import {getUserFallback} from "@/utils/getUserFallback";
import {AvatarProps} from "@/types/layout/avatarProps";
import {cn} from "@/lib/utils";

export const UserAvatar: FC<AvatarProps> = ({
    width,
    height,
    userName,
    userImage
}) => {

    return <Avatar className={cn(width, height)}>
        <AvatarImage src={userImage || ""}/>
        <AvatarFallback>{getUserFallback(userName!)}</AvatarFallback>
    </Avatar>
}