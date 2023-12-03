import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FC} from "react";
import {PlanCardProps} from "@/types/pages/setting/plans/planCardProps";
import {formatCurrency} from "@/utils/formatCurrency";

export const PlanCard: FC<PlanCardProps> = ({title, description, planOptions, price}) => {
    const currentPrice = price ? formatCurrency(price) : null

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
                    <Button className="w-full rounded-sm bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400">
                        Upgrade
                    </Button>
                ) : (
                    <Button className="w-full rounded-sm bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400">
                        Your plan
                    </Button>
                )
            }
        </CardFooter>
    </Card>

}