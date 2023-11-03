"use client"

import dynamic from "next/dynamic";
import axios from "axios";
import React, {useState} from "react";
import Loader from "@/components/Loader";
import {AiOutlineSend} from "react-icons/ai";
import SizeOptions from "@/components/pagesComponents/image-generator/SizeOptions";
import AmountOptions from "@/components/pagesComponents/image-generator/AmountOptions";
import {FiImage} from "react-icons/fi";
import Empty from "@/components/Empty";
import {IUserData} from "@/interfaces/IUserData";
import {IAssistantData} from "@/interfaces/IAssistantData";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";
import {toast} from "@/components/ui/use-toast";
import {Textarea} from "@/components/ui/textarea";

const Download = dynamic(() => import('@/components/pagesComponents/image-generator/Download').then(module => module.Download))
const ImageGenerator = () => {
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<Array<IUserData | IAssistantData>>([])
    const [userMessage, setUserMessage] = useState<IUserData>({
        role: 'user',
        data: {}
    } as IUserData)
    const handleGenerate = async () => {
        try {
            setLoading(true)
            // generate images
            const res = await axios.post('/api/image', userMessage)
            const assistantMessage = res.data as IAssistantData
            setMessages([...messages, userMessage, assistantMessage])
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
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
                <FiImage className="text-4xl text-pink-700"/>
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl text-zinc-700">Image Generator</h1>
                    <span className="text-zinc-400 text-sm">Turn your prompt into an image.</span>
                </div>
            </div>

            <div className="rounded-md row-span-5 overflow-auto">
                <div className="flex flex-col space-y-4 my-8">
                    {!loading && messages.length < 1 && <Empty content="No Conversation Started."/>}

                    {
                        messages.map((message: IUserData | IAssistantData, index) => (
                            <div key={index} className={cn("flex self-start gap-x-3 px-4 md:px-8 lg:px-16", {
                                "self-end flex-row-reverse": message?.role !== "user",
                            })}>
                                {
                                    message?.role === "user"
                                        ? <Avatar className="text-xs w-6 h-6">
                                            <AvatarImage src={""} className="p-2 bg-gray-700"/>
                                            <AvatarFallback className="p-2 bg-gray-300">YA</AvatarFallback>
                                        </Avatar>
                                        : <Avatar className="text-xs w-6 h-6">
                                            <AvatarImage
                                                src={"https://seeklogo.com/images/B/brain-logo-085FB58CDA-seeklogo.com.png"}
                                                className=" bg-gray-700"/>
                                            <AvatarFallback className="p-2 bg-gray-300">AI</AvatarFallback>
                                        </Avatar>
                                }
                                <div
                                    className={cn("flex border border-zinc/5 rounded-md shadow-md p-2 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl padeIn", {
                                        "bg-white mr-10 ml-1": message?.role !== "assistant",
                                        "bg-muted ml-10 mr-1": message?.role === "assistant"
                                    })}>
                                    <div className="flex flex-col justify-end relative">
                                        {
                                            <span className="text-sm leading-7">
                                                {"data" in message && message.data.prompt}
                                            </span>
                                        }
                                        {
                                            <div className={cn("grid grid-cols-2 gap-1 sm:gap-2", {
                                                "grid-cols-1": "images" in message && message.images.length < 2
                                            })}>
                                                {
                                                    "images" in message && message.images.map((img, index) => {
                                                        return <div
                                                            key={index}
                                                            className="
                                                                 rounded-lg
                                                                 bg-white
                                                                 p-1
                                                                 shadow-md
                                                                 relative
                                                                 w-full
                                                             "
                                                        >
                                                            <Image
                                                                src={img.url}
                                                                alt="img"
                                                                width={200}
                                                                height={200}
                                                            />
                                                            <Download url={img.url}/>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    {loading && <Loader width="w-12" height="h-12" content="Brain is thinking..."/>}
                </div>
            </div>

            <div className="flex flex-col items-center border rounded-md p-1 h-28 self-end overflow-hidden">
                <div className="flex gap-x-4 items-center justify-end px-4 py-1 w-full">
                    <AmountOptions userMessage={userMessage} setUserMessage={setUserMessage}/>
                    <SizeOptions userMessage={userMessage} setUserMessage={setUserMessage}/>
                </div>
                <div  className="flex gap-2 w-full p-1">
                    <Textarea
                        placeholder="A fox in the style of Starry Night."
                        className="resize-none px-1 w-full border-0 outline-none focus-visible:ring-0, focus-visible:ring-transparent no-scrollbar"
                        maxLength={2000}
                        onChange={(e) => setUserMessage({
                            ...userMessage,
                            data: {
                                ...userMessage.data,
                                prompt: e.target.value
                            }
                        })}
                    />
                    <div
                        className="flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-3 sm:justify-between self-end pb-4">
                        <span className="text-zinc-400 text-sm">{userMessage.data.prompt?.length || 0}/500</span>
                        <AiOutlineSend
                            className="text-xl cursor-pointer active:text-muted-foreground hover:text-muted-foreground"
                            onClick={handleGenerate}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageGenerator;