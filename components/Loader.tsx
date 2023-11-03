import React, {FC} from 'react';
import {cn} from "@/lib/utils";

type loaderProps = {
    height: string
    width: string
    content?: string
}
const Loader: FC<loaderProps> = ({height, width, content}) => {
    return (
        <div className="flex flex-col justify-center items-center gap-y-4 h-full">
            <div className={cn("relative animate-spin rounded-full bg-gradient-to-r from-pink-400 via-violet-400 to-blue-300 p-1", height, width)}>
                <div className={cn("bg-white rounded-full z-10", height, width)}/>
            </div>
            {content && <span className="text-sm text-muted-foreground">{content}</span>}
        </div>
    )
}

export default Loader;