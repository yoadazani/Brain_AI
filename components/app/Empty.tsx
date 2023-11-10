import React from 'react';
import Image from "next/image";
import empty from "@/assets/empty.png";
import {EmptyProps} from "@/types/app/emptyProps";


const Empty = ({content}: EmptyProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <Image className="in-out" src={empty} alt="empty icon" width={300} height={300}/>
            <p className="font-semibold text-zinc-500">{content}</p>
        </div>
    )
}

export default Empty;