"use client";

import React, {useState} from 'react';
import {MessageSquare} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import axios from "axios";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useToast} from "@/components/ui/use-toast";
import {cn} from "@/lib/utils";
import {AiOutlineSend} from "react-icons/ai";
import Empty from "@/components/app/Empty";
import Loader from "@/components/app/Loader";
import ReactMarkDown from "react-markdown";
import {IMessage} from "@/interfaces/IMessage";

const Conversation = () => {

    const {toast} = useToast();
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<IMessage[]>([])
    const [userMessage, setUserMessage] = useState<IMessage>({
        role: 'user',
        content: ''
    })

    const handleGenerate = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/conversation', {
                role: 'user',
                content: userMessage.content
            })
            setMessages([...messages, userMessage, res.data])
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
                <MessageSquare className="text-4xl text-violet-500"/>
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl text-zinc-700">conversation</h1>
                    <span className="text-zinc-400 text-sm">Our most advanced conversation model</span>
                </div>
            </div>

            <div className="rounded-md row-span-5 overflow-auto">
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
                                className={cn("flex border border-zinc/5 rounded-md shadow-md px-4 py-2 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl", {
                                    "bg-muted ml-10 mr-1": message?.role === "assistant",
                                    "bg-white mr-10 ml-1": message?.role !== "assistant"
                                })}>
                                <div className="flex flex-col justify-end relative">
                                    <ReactMarkDown
                                        components={{
                                            pre: ({node, ...props}) => (
                                                <div
                                                    className="overflow-auto w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-black/5 my-2 p-2 rounded-lg">
                                                    <pre className="px-2" {...props} />
                                                </div>
                                            ),
                                            li: ({node, ...props}) => (
                                                <li className="border-b-2 border-violet-300 border-double bg-black/5 py-1 px-4 rounded-lg my-1.5" {...props} />
                                            )
                                        }}
                                        className="text-sm leading-7 mx-auto"
                                    >
                                        {message?.content || ""}
                                    </ReactMarkDown>
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && <Loader width="w-12" height="h-12" content="Brain is thinking..."/>}
                </div>
            </div>


            <div className="flex items-center border rounded-md p-1 h-24 self-end">
                <Textarea
                    className="resize-none px-1 w-full border-0 outline-none focus-visible:ring-0, focus-visible:ring-transparent no-scrollbar"
                    maxLength={2000}
                    placeholder="How do i calculate the area of a circle ?"
                    onChange={(e) => setUserMessage({...userMessage, content: e.target.value})}
                />
                <div
                    className="flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-3 sm:justify-between self-end pb-1 px-4">
                    <span className="text-zinc-400 text-sm">{userMessage.content.length}/2000</span>
                    <AiOutlineSend
                        className="text-xl cursor-pointer active:text-muted-foreground hover:text-muted-foreground"
                        onClick={handleGenerate}/>
                </div>
            </div>
        </div>
    )
}
export default Conversation;