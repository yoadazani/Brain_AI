"use client"

import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {Zap} from "lucide-react";
import {useRouter} from "next/navigation";
import {getUserLimit} from "@/services/actions/apiLimitActions/getUserLimit";
import {FC} from "react";
import {LimitCounterProps} from "@/types/app/LimitCounterProps";
import {FREE_TRIAL_LIMIT} from "@/constants/app/freeTrialLimit";

export const LimitCounter: FC<LimitCounterProps> = ({ apiLimitCount }) => {
    const router = useRouter();

    return <div className="flex flex-col space-y-2.5 p-6 bg-gray-800">
        <div className="flex flex-col space-y-1 text-center text-sm">
            <span className="text-gray-400">{ apiLimitCount } / { FREE_TRIAL_LIMIT } free generations</span>
            <Progress value={apiLimitCount * 100 / FREE_TRIAL_LIMIT} className="w-full h-3"/>
        </div>
        <Button
            size="sm"
            className="w-full"
            variant="premium"
            onClick={() => {
                console.log("userApiLimit", apiLimitCount)
                router.push("/setting/plans")
            }}
        >
            Upgrade
            <Zap className="w-4 h-4 ml-2"/>
        </Button>
    </div>;
}