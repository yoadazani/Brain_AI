import React from 'react';
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {Session} from "next-auth";

export const LandingHero = ({session}: { session: Session } ) => {

    return <>
        <div className="text-white font-bold px-36 py-28 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl space-y-5 font-extrabold">
                <h1>
                    The Best AI Tool For
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 p-1">
                    <TypewriterComponent
                        options={{
                            strings: [
                                "ChatBot.",
                                "Code Generator.",
                                "Image Generator.",
                                "Audio Transcriptions",
                                "Video Generator."
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Continue with our easy-to-use platform.
            </div>
            <div>
                <Link href={session ? "/dashboard" : "/register"}>
                    <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                        Start Generating For Free
                    </Button>
                </Link>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                No credit card required.
            </div>
        </div>
    </>
}