"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FC, useState} from "react";
import {PlanCardProps} from "@/types/pages/setting/plans/planCardProps";
import {formatCurrency} from "@/utils/formatCurrency";
import axios from "axios";
import {useRouter} from "next/navigation";
import {sleep} from "@/utils/sleep";
import {ButtonLoader} from "@/components/app/ButtonLoader";

export const PlanCard: FC<PlanCardProps> = ({title, description, planOptions, price, isPro}) => {
    const router = useRouter()
    const currentPrice = price ? formatCurrency(price) : null
    const [loading, setLoading] = useState(false)

    const handleSubscription = async () => {
        setLoading(true)
        await sleep(1500)
        try {
            const response = await axios.get("/api/stripe")

            router.replace(response.data.url)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return <Card className="text-center">
        <CardHeader>
            <CardTitle>
                {title}
            </CardTitle>
            <CardDescription>
                {description}
            </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
            <div className="flex justify-center items-end space-x-1">
                {
                    !currentPrice ? (
                        <span className="text-4xl font-bold">Free Plan</span>
                    ) : (
                        <>
                            <span className="text-4xl font-bold">{currentPrice}</span>
                            <span className="text-zinc-500">/ month</span>
                        </>
                    )
                }
            </div>
            <div className="space-x-2t">
                <span>{planOptions[0].available ? "✅" : "❌"}</span>
                <span className="text-zinc-500">{planOptions[0].option}</span>
            </div>
        </CardContent>

        <CardFooter>
            {
                price ? (
                    <>
                        <Button
                            variant="premium"
                            className="w-full"
                            onClick={handleSubscription}
                        >
                            {
                                loading
                                    ? <ButtonLoader/>
                                    : isPro
                                        ? "Manage Subscription"
                                        : "Upgrade"
                            }

                        </Button>
                    </>
                ) : (
                    <Button
                        variant="premium"
                        className="w-full"
                        disabled
                    >
                        Your plan
                    </Button>
                )
            }
        </CardFooter>
    </Card>

}