"use client"

import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useSession} from "next-auth/react";
import {LandingNavBar} from "@/components/pages/landing/LandingNavBar";
import {LandingHero} from "@/components/pages/landing/LandingHero";
import {LandingContent} from "@/components/pages/landing/LandingContent";


export default function Home() {
    const router = useRouter();
    const {data: session} = useSession();
    const handleNavigate = () => {
        console.log(session)
        return router.push(!session ? "/register" : "/dashboard")
    }

    return (
        <main className="h-full bg-gray-900">
            <LandingNavBar />
            <LandingHero session={session!}/>
            <LandingContent session={session!}/>
        </main>
    )
}
