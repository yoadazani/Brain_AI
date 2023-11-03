import Replicate from "replicate";
import {NextRequest, NextResponse} from "next/server";
import openai from "@/lib/openaiConnection";
import {Uploadable} from "openai/uploads";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

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

        const response = await openai.audio.transcriptions.create({
            file: data.input_audio as Uploadable,
            language: data.language as string,
            model: "whisper-1",
            response_format: "json",
            temperature: 0.5
        })

        return NextResponse.json({
            role: "assistant",
            content: response.text
        }, {
            status: 200
        })
    } catch (error) {
        console.log("[MUSIC_ERROR]", error)
        return new NextResponse("internal server error", {
            status: 500
        })
    }

}