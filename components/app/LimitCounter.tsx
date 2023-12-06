"use client"

import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {Zap} from "lucide-react";
import {useRouter} from "next/navigation";
import {FC, useState} from "react";
import {LimitCounterProps} from "@/types/app/LimitCounterProps";
import {FREE_TRIAL_LIMIT} from "@/constants/app/freeTrialLimit";
import {sleep} from "@/utils/sleep";
import {ButtonLoader} from "@/components/app/ButtonLoader";

export const LimitCounter: FC<LimitCounterProps> = ({apiLimitCount}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        await sleep(3000)
        router.push('/setting/plans')
        setLoading(false);
    }

    return <div className="flex flex-col space-y-2.5 p-6 bg-gray-800">
        <div className="flex flex-col space-y-1 text-center text-sm">
            <span className="text-gray-400">{apiLimitCount} / {FREE_TRIAL_LIMIT} free generations</span>
            <Progress value={apiLimitCount * 100 / FREE_TRIAL_LIMIT} className="w-full h-3"/>
        </div>
        <Button
            size="sm"
            className="w-full"
            variant="premium"
            onClick={handleUpgrade}
        >

            {
                loading
                    ? <ButtonLoader/>
                    : <>
                        Upgrade
                        <Zap className="mr-2 h-4 w-4"/>
                    </>
            }
        </Button>
    </div>;
}