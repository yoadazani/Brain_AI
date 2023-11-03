import React, {useEffect, useRef, useState} from 'react';
import WaveSurfer from 'wavesurfer.js';
import {BsFillPauseFill, BsFillPlayFill, BsFillStopFill} from "react-icons/bs";
import {FaVolumeDown, FaVolumeMute} from "react-icons/fa";

export const WaveSurferAudio = ({url}: { url: string }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer>()
    const [duration, setDuration] = useState("")
    const [currentTime, setCurrentTime] = useState("")
    const waveSurferRef = useRef(null)


    useEffect(() => {
        if (!waveSurferRef.current) return
        let wavesurfer = WaveSurfer.create({
            container: waveSurferRef.current,
            waveColor: 'violet',
            progressColor: 'purple',
            cursorColor: 'purple',
            cursorWidth: 1,
            hideScrollbar: true,
            height: 60,
            barWidth: 1,
            barRadius: 3,
        })
        wavesurfer.load(url).then()

        setWavesurfer(wavesurfer)

        return () => {
            wavesurfer.destroy()
        }
    }, [url])

    const getDuration = (): string => {
        if (!wavesurfer) return "00:00"
        const minutes = Math.floor(wavesurfer.getDuration() / 60)
        const seconds = Math.floor(wavesurfer.getDuration() % 60)

        const fixedMinutes = minutes.toString().padStart(2, "0")
        const fixedSeconds = seconds.toString().padStart(2, "0")

        return `${fixedMinutes}:${fixedSeconds}`
    }

    const getCurrentTime = (): string => {
        if (!wavesurfer) return "00:00"
        const minutes = Math.floor(wavesurfer.getCurrentTime() / 60)
        const seconds = Math.floor(wavesurfer.getCurrentTime() % 60)

        const fixedMinutes = minutes.toString().padStart(2, "0")
        const fixedSeconds = seconds.toString().padStart(2, "0")
        return `${fixedMinutes}:${fixedSeconds}`
    }

    wavesurfer?.addEventListener("ready", () => {
        setDuration(getDuration())
    })

    wavesurfer?.addEventListener("timeupdate", () => {
        setCurrentTime(getCurrentTime())
    })

    const play = async () => {
        if (!wavesurfer) return
        await wavesurfer.playPause()
        setIsPlaying(wavesurfer?.isPlaying())
    }
    const stop = () => {
        if (!wavesurfer) return
        wavesurfer.stop()
        setIsPlaying(wavesurfer?.isPlaying())
    }
    const mute = () => {
        if (!wavesurfer) return
        if (wavesurfer.getMuted()) {
            wavesurfer.setMuted(false)
        } else {
            wavesurfer.setMuted(true)
        }
        setIsMuted(wavesurfer?.getMuted())
    }

    return <div className="flex flex-col w-full h-full">
        <div className="cursor-pointer h-full w-full">
            <div id="waveform" ref={waveSurferRef}/>
        </div>


        <div className="flex items-center gap-x-2 mt-1 bg-gray-800 text-white w-full p-2">
            <div onClick={play} className="cursor-pointer">
                {!isPlaying ? <BsFillPlayFill/> : <BsFillPauseFill/>}
            </div>
            <div onClick={stop} className="cursor-pointer">
                <BsFillStopFill/>
            </div>
            <div onClick={mute} className="cursor-pointer flex items-center">
                {!isMuted ? <FaVolumeDown/> : <FaVolumeMute/>}
            </div>
            <div className="ml-2">
                {currentTime} : {duration}
            </div>
        </div>
    </div>
}
