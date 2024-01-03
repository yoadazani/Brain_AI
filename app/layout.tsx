import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ReactNode} from "react";
import CrispChat from "@/components/app/CrispChat";
import {Toaster} from "@/components/ui/toaster";
import NextAuthProvider from "@/context/auth/NextAuthProvider";

const inter = Inter({subsets: ['latin'], fallback: ['system-ui', 'arial'], variable: '--font-inter'})

export const metadata: Metadata = {
    title: 'Brain Ai',
    description: 'The Most Intelligent Brain in the World - Powered by Yoad Azani.',
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <NextAuthProvider>
            <html lang="en">
                <body className={inter.className}>
                    <Toaster/>
                    <CrispChat/>
                    {children}
                </body>
            </html>
        </NextAuthProvider>
    )
}
