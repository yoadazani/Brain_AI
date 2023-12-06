import {Code, Image, LayoutDashboard, MessageSquare, Music, Settings, User, Zap} from "lucide-react";


export const sideBarLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        color: "text-sky-400",
        subLinks: undefined
    },
    {
        name: "Conversation",
        href: "/conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        subLinks: undefined
    },
    {
        name: "Code Generator",
        href: "/code-generator",
        icon: Code,
        color: "text-green-700",
        subLinks: undefined
    },
    {
        name: "Image Generator",
        href: "/image-generator",
        icon: Image,
        color: "text-pink-700",
        subLinks: undefined
    },
    {
        name: "Audio Transcriptions",
        href: "/audio-transcriptions",
        icon: Music,
        color: "text-emerald-500",
        subLinks: undefined
    },
    {
        name: "Setting",
        href: "/setting",
        icon: Settings,
        color: "text-zinc-400",
        subLinks: [
            {
                name: "Account",
                href: "/setting/account",
                icon: User,
                color: "text-indigo-600",
                subLinks: []
            },
            {
                name: "Plans",
                href: "/setting/plans",
                icon: Zap,
                color: "text-amber-400",
                subLinks: []
            }
        ]
    },
]