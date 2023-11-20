import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Settings} from "lucide-react";
import React from "react";

const Setting = () => {
    return (
        <div className="grid row-span-full h-screen overflow-hidden pb-1 px-4 md:px-8 lg:px-16">
            <div className="flex items-center space-x-4 row-span-1">
                <Settings className="text-4xl text-pink-700"/>
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl text-zinc-700">Settings</h1>
                    <span className="text-zinc-400 text-sm">Turn your prompt into an image.</span>
                </div>
            </div>

                <Tabs defaultValue="account" className="w-[400px] row-span-6 space-y-4 my-8">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>
        </div>
    )
}

export default Setting;