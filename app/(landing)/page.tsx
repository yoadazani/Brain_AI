"use client"

import {useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const ICON = "https://seeklogo.com/images/B/brain-logo-085FB58CDA-seeklogo.com.png";

export default function Home() {
    const router = useRouter();

    const handleNavigate = () => {
        return router.push("/dashboard")
    }

    return (
        <main className="h-screen bg-gray-900">
            <div className="flex justify-end items-center space-x-4 py-2 px-4">
                <Button onClick={handleNavigate} variant="ghost" size="sm" className="text-sm text-zinc-100 hover:bg-transparent hover:text-zinc-100">
                    <span>
                        Go to dashboard
                    </span>
                </Button>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={ICON}/>
                    <AvatarFallback>AI</AvatarFallback>
                </Avatar>
            </div>

            <section className="h-full bg-gray-900 flex flex-col justify-center items-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">
                            Welcome to our Lending Page
                        </h1>
                        <p className="text-lg text-gray-400 mb-8">
                            We provide the best lending solutions for your needs
                        </p>
                        <button
                            onClick={handleNavigate}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}
