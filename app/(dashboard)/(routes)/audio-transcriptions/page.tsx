"use client"

import React, {FormEvent, useState} from "react";
import {BiMusic} from "react-icons/bi";
import Empty from "@/components/Empty";
import {AiOutlineClear, AiOutlineSend} from "react-icons/ai";
import {toast} from "@/components/ui/use-toast";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Loader from "@/components/Loader";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {WaveSurferAudio} from "@/components/WaveSurferAudio";
import {SelectLang} from "@/components/SelectLang";
import axios from "axios";

const MusicGenerator = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [audio, setAudio] = useState<string | null>();
    const [language, setLanguage] = useState("");
    const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const blob = new Blob([file], {type: file.type});
            const url = URL.createObjectURL(blob);
            setAudio(url)
        } else {
            setAudio(null)
        }
    }
    const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setLoading(true)
            const form = e.currentTarget
            const formData = new FormData(form)
            formData.set("language", language)

            const res = await axios.post("/api/audio", formData)

            setMessages([
                ...messages, {role: "user", content: audio}, res.data
            ])

            setAudio(null)
        } catch (error) {
            const {response} = error as {response: {data: string}}
            const {data} = response
            toast({
                title: 'Error',
                description: data,
                variant: "destructive",
                duration: 3000,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid row-span-full h-screen overflow-hidden pb-1 px-4 md:px-8 lg:px-16 relative">
            <div className="flex items-center space-x-4">
                <BiMusic className="text-4xl text-emerald-500"/>
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl text-zinc-700">Audio Transcription</h1>
                    <span className="text-zinc-400 text-sm">Turn your prompt into an music.</span>
                </div>
            </div>

            <div className="rounded-md row-span-5 overflow-auto mb-8">
                <div className="flex flex-col space-y-4 my-8">
                    {!loading && messages.length < 1 && <Empty content="No Conversation Started."/>}
                    {messages?.map((message, index) => (
                        <div key={index} className={cn("flex self-start gap-x-3 px-4 md:px-8 lg:px-16", {
                            "self-end flex-row-reverse": message?.role !== "user",
                        })}>
                            {
                                message?.role === "user" ?
                                    (
                                        <Avatar className="text-xs w-6 h-6">
                                            <AvatarImage src={""} className="p-2 bg-gray-700"/>
                                            <AvatarFallback className="p-2 bg-gray-300">YA</AvatarFallback>
                                        </Avatar>
                                    ) :
                                    <Avatar className="text-xs w-6 h-6">
                                        <AvatarImage
                                            src={"https://seeklogo.com/images/B/brain-logo-085FB58CDA-seeklogo.com.png"}
                                            className=" bg-gray-700"/>
                                        <AvatarFallback className="p-2 bg-gray-300">AI</AvatarFallback>
                                    </Avatar>
                            }
                            <div
                                className={cn("flex border border-zinc/5 rounded-md shadow-md px-4 py-2 w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl", {
                                    "bg-muted ml-10 mr-1": message?.role === "assistant",
                                    "bg-white mr-10 ml-1": message?.role !== "assistant"
                                })}>
                                <div className={cn("flex flex-col justify-end relative overflow-auto w-full", {
                                    "w-[192px] sm:w-[250px] md:w-[282px] lg:w-[325px] xl:w-[500px]": message?.role === "user"
                                })}>
                                    {message.role === "user" && <WaveSurferAudio url={message.content}/>}
                                    {message.role === "assistant" && <p>{message.content}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && <Loader width="w-12" height="h-12" content="Brain is thinking..."/>}
                </div>
            </div>

            <form onSubmit={handleGenerate}
                  className="flex flex-row gap-x-2 items-center border rounded-md px-3 py-1 self-end overflow-hidden z-50 bg-white">
                <div className="flex flex-col h-24 w-full relative">
                    {!audio
                        ? <Label htmlFor="input_audio"
                                 className="cursor-pointer h-full text-center w-full absolute py-2 border-dotted border-2"
                                 title="Drag file here"
                        >
                            <p className="text-sm">Drag file here</p>
                            <p className="text-lg font-bold">OR</p>
                            <p className="text-sm">click to upload file</p>
                        </Label>
                        : <WaveSurferAudio url={audio}/>

                    }
                    <Input
                        type="file"
                        name="input_audio"
                        id="input_audio"
                        accept=".mp3, .m4a"
                        className="h-full w-full hidden border-dotted border-2"
                        onChange={handleAudioChange}
                    />
                </div>

                <div className="flex flex-col place-items-center justify-between space-y-1">
                    <Button type="submit" variant="ghost" onClick={() => setAudio(null)}>
                        <AiOutlineClear
                            className="text-xl cursor-pointer active:text-muted-foreground hover:text-muted-foreground"
                        />
                    </Button>
                    <SelectLang setLang={setLanguage} lang={language}/>
                    <Button type="submit" variant="ghost">
                        <AiOutlineSend
                            className="text-xl cursor-pointer active:text-muted-foreground hover:text-muted-foreground "
                        />
                    </Button>
                </div>
            </form>
        </div>
    )
}


export default MusicGenerator;