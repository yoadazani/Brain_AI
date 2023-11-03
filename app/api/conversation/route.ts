import {NextResponse} from "next/server";
import openai from "@/lib/openaiConnection";


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

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.7,
            max_tokens: 1000
        })

        return NextResponse.json(response.choices[0].message)
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error)
        return new NextResponse("internal server error", {
            status: 500
        })
    }

}