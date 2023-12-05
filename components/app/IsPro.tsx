"use client"

import {Zap} from "lucide-react";
import {useRouter} from "next/navigation";
import {FC} from "react";
import {Badge} from "@/components/ui/badge";

export const IsPro: FC = () => {
    const router = useRouter();

    return <div className="flex flex-col space-y-2.5 p-6 bg-gray-800">
        <div className="flex flex-col space-y-1 text-center text-sm">
            <span className="text-gray-400">You are in Pro mode.</span>
        </div>
        <Badge variant="premium" className="self-center text-sm border-0">
            Brain Pro
        </Badge>
    </div>;
}