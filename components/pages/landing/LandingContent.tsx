import React from 'react';
import {Session} from "next-auth";
import {models} from "@/data/models";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";

export const LandingContent = ({session}: { session: Session }) => {
    return <div className="pb-16">
        <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center text-zinc-100">
            <h1>
                our models
            </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 py-4 px-4 md:px-8 lg:px-16">
            {
                models.map((model, index) => {
                    return (
                        <Card key={index}
                              className="bg-gray-800 outline-none border-0 shadow-lg p-5 text-center space-y-2">
                            <CardHeader className="text-2xl font-bold text-zinc-100">
                                <CardTitle className="flex flex-col items-center justify-center gap-y-1">
                                    <model.icon className={cn("h-10 w-10", model.color)}/>
                                    {model.label}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-zinc-400 text-sm font-normal">
                                    {model.description}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div>
    </div>
}