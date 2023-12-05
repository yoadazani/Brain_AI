import {NextResponse} from "next/server";
import openai from "@/lib/openaiConnection";
import {checkUserLimit} from "@/services/actions/apiLimitActions/checkUserLimit";
import {increaseUserLimit} from "@/services/actions/apiLimitActions/increaseUserLimit";
import {checkUserSubscription} from "@/services/actions/userSubscription/checkUserSubscription";


export async function POST(req: Request) {

    try {
        const body = await req.json()

        if (!openai.apiKey) {
            return new NextResponse("OpenAi Api Key is not configured", {
                status: 500
            })
        }

        if (!body.data) {
            return new NextResponse("Prompt is not configured", {
                status: 400
            })
        }

        const isPro = await checkUserSubscription()

        const freeTrial = await checkUserLimit()

        if (!freeTrial && !isPro) {
            return new NextResponse("api limit is expired!", {
                status: 400
            })
        }

        const response = await openai.images.generate({
            prompt: body.data.prompt,
            n: body.data.n,
            size: body.data.size
        })

        if (!isPro) await increaseUserLimit()

        return NextResponse.json({role: "assistant", images: response.data})
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error)
        return new NextResponse("internal server error", {
            status: 500
        })
    }

}