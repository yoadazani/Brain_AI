"use client"

import {Card} from "@/components/ui/card";



import {usePathname, useRouter} from "next/navigation"
import {sideBarLinks} from "@/data/sideBarLinks";
import {cn} from "@/lib/utils";

export default function Home() {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <>
            <div className="flex flex-col justify-center items-center space-y-2 lg:space-y-4 mb-3 lg:mb-5">
                <h1 className="text-3xl font-bold tracking-wider"> Explore the power of AI </h1>
                <span className="text-zinc-500 tracking-wider">chat with the smartest AI today - it's free and easy to use</span>
            </div>
            <main className="flex flex-col h-full px-4 md:px-20 lg:px-32 space-y-3 xg:space-y-4">
                {sideBarLinks?.map(link => (
                    <Card key={link.name} className="flex items-center justify-between p-2 xl:p-3 cursor-pointer"
                          onClick={() => router.push(link.href)}>
                        <div className="flex flex-row items-center space-x-4">
                            <div className="w-fit rounded-md">
                                <link.icon className={cn("text-2xl text-blue-700")}/>
                            </div>
                            <div>
                                <span className="font-semibold text-lg text-zinc-700">{link.name}</span>
                            </div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                            </svg>
                        </div>
                    </Card>
                ))}
            </main>
        </>
    )
}
