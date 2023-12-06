import {NextResponse} from "next/server";
import openai from "@/lib/openaiConnection";
import {checkUserLimit} from "@/services/actions/apiLimitActions/checkUserLimit";
import {increaseUserLimit} from "@/services/actions/apiLimitActions/increaseUserLimit";
import {checkUserSubscription} from "@/services/actions/userSubscription/checkUserSubscription";

const instructionMessage = {
    role: "system",
    content: "You are a code generator. you must answer only in markdown code snipped. use code comments for explanation."
}

export async function POST(req: Request) {

    try {
        const body = await req.json()
        const messages = [body]

        if (!openai.apiKey) {
            return new NextResponse("OpenAi Api Key is not configured", {
                status: 500
            })
        }

        if (!body.content) {
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

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
            temperature: 0.7
        })

        if (!isPro) await increaseUserLimit()

        return NextResponse.json(response.choices[0].message)
    } catch (error: any) {
        console.log("[CONVERSATION_ERROR]", error)
        return new NextResponse(`internal server error`, {
            status: 500
        })
    }

}