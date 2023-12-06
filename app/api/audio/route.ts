import {NextRequest, NextResponse} from "next/server";
import openai from "@/lib/openaiConnection";
import {checkUserLimit} from "@/services/actions/apiLimitActions/checkUserLimit";
import {increaseUserLimit} from "@/services/actions/apiLimitActions/increaseUserLimit";
import {checkUserSubscription} from "@/services/actions/userSubscription/checkUserSubscription";

export async function POST(request: NextRequest) {
    try {

        const body = await request.formData()

        const data = Object.fromEntries(body.entries())

        if (!openai.apiKey) {
            return new NextResponse("OpenAi Api Key is not configured", {
                status: 500
            })
        }

        if (!data.input_audio) {
            return new NextResponse("input audio is not configured", {
                status: 400
            })
        }

        if (!data.language) {
            return new NextResponse("language is not configured", {
                status: 400
            })
        }

        const file = data.input_audio as File
        if (file.size > 4 * 1024 * 1024) {
            return new NextResponse("file size is too large", {
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

        const response = await openai.audio.transcriptions.create({
            file,
            language: data.language as string,
            model: "whisper-1",
            response_format: "json",
            temperature: 0.5
        })

        if (!isPro) await increaseUserLimit()

        return NextResponse.json({
            role: "assistant",
            content: response.text
        }, {
            status: 200
        })
    } catch (error: any) {
        console.log("[AUDIO_TRANSCRIPTION_ERROR]", error)
        return new NextResponse(`internal server error ${error.message}`, {
            status: 500
        })
    }

}