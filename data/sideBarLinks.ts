import {LuLayoutDashboard} from "react-icons/lu";
import {BiConversation, BiMusic, BiVideo} from "react-icons/bi";
import {BsCodeSlash} from "react-icons/bs";
import {FiImage, FiSettings} from "react-icons/fi";

export const sideBarLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LuLayoutDashboard,
        color: "text-sky-400",
    },
    {
        name: "Conversation",
        href: "/conversation",
        icon: BiConversation,
        color: "text-violet-500"
    },
    {
        name: "Code Generator",
        href: "/code-generator",
        icon: BsCodeSlash,
        color: "text-green-700"
    },
    {
        name: "Image Generator",
        href: "/image-generator",
        icon: FiImage,
        color: "text-pink-700"
    },
    {
        name: "Audio Transcriptions",
        href: "/audio-transcriptions",
        icon: BiMusic,
        color: "text-emerald-500",
    },
    {
        name: "setting",
        href: "/setting",
        icon: FiSettings,
        color: "text-slate-400",
    },
]