"use client"

import {FiDownload} from "react-icons/fi"
import {saveAs} from "file-saver"
import {DownloadProps} from "@/types/utils/downloadProps";


export const Download = ({url}: DownloadProps) => {

    return <div
        className="flex items-center gap-x-2 bg-gray-800 text-white py-1 px-2 w-full cursor-pointer"
        onClick={() => {
            saveAs(url, "image.png")
        }}
    >
        <div className="w-full">
            <span className="font-semibold text-sm">Download</span>
        </div>
        <FiDownload className="text-xl"/>
    </div>
}