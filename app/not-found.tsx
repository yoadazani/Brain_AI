"use client"

import { useRouter } from "next/navigation";

import {Button} from "@/components/ui/button";

const NotFound = () => {
    const router = useRouter()
    return (
        <main className="flex flex-col gap-2 justify-center items-center h-screen">
            <h1 className="tracking-wider text-9xl font-extrabold text-zinc-700">404</h1>
            <p className="mt-4 text-2xl font-semibold">Page Not Found!</p>
            <span className="text-sm text-zinc-500 font-light tracking-wider"> We are sorry, but the page you requested could not be found. </span>

            <div className="p-5">
                <Button variant="default" className="bg-zinc-700" onClick={() => router.push("/dashboard")}>
                    Back to Dashboard
                </Button>
            </div>
        </main>
    );
}

export default NotFound;