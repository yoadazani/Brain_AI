import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useRouter} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";


const ICON = "https://seeklogo.com/images/B/brain-logo-085FB58CDA-seeklogo.com.png";

export const LandingNavBar = () => {
    const router = useRouter();
    return <>
        <div className="flex justify-between items-center space-x-8 py-2 px-4">
            <Avatar className="h-8 w-8">
                <AvatarImage src={ICON}/>
                <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex space-x-4">
                <Link href={"/login"}>
                    <Badge
                        className="text-sm text-center border-0 pb-1 font-bold uppercase"
                        variant="premium"
                    >
                        sign in
                    </Badge>
                </Link>
                <Link href={"/register"}>
                    <Badge
                        className="text-sm text-center border-0 pb-1 font-bold uppercase"
                        variant="premium"
                    >
                        sign up
                    </Badge>
                </Link>
            </div>
        </div>
    </>
}