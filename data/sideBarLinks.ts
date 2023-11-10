import {Code, Image, LayoutDashboard, MessageSquare, Music, Settings} from "lucide-react";


export const sideBarLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        color: "text-sky-400",
    },
    {
        name: "Conversation",
        href: "/conversation",
        icon: MessageSquare,
        color: "text-violet-500"
    },
    {
        name: "Code Generator",
        href: "/code-generator",
        icon: Code,
        color: "text-green-700"
    },
    {
        name: "Image Generator",
        href: "/image-generator",
        icon: Image,
        color: "text-pink-700"
    },
    {
        name: "Audio Transcriptions",
        href: "/audio-transcriptions",
        icon: Music,
        color: "text-emerald-500",
    },
    {
        name: "setting",
        href: "/setting",
        icon: Settings,
        color: "text-zinc-400",
    },
]