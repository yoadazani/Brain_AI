import {Code, Image, MessageSquare, Music} from "lucide-react";

export const models = [
    {
        label: "Chat-bot",
        value: "Chat Bot",
        icon: MessageSquare,
        color: "text-violet-500",
        description: "AI-powered chatbot that can answer questions about anything in a friendly and helpful manner.",
    },
    {
        label: "Code-generator",
        value: "Code Generator",
        icon: Code,
        color: "text-green-700",
        description: "AI-powered code generator that can generate code for your product or services in a friendly and helpful manner.",
    },
    {
        label: "Image-generator",
        value: "Image Generator",
        icon: Image,
        color: "text-pink-700",
        description: "AI-powered image generator that can generate images by providing a description, keywords, or tags in a friendly and helpful manner.",
    },
    {
        label: "audio-transcriptions",
        value: "Audio Transcriptions",
        icon: Music,
        color: "text-emerald-500",
        description: "AI-powered audio transcriptions that can transcribe audio into text in a friendly and helpful manner.",
    }
]