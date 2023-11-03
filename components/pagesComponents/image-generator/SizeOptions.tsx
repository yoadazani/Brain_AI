import React, {Dispatch, FC, SetStateAction} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {IResolution} from "@/interfaces/IResolution";
import {IUserData} from "@/interfaces/IUserData";
import {resolutions} from "@/data/resolutions";

type SizeOptionsProps = {
    userMessage: IUserData,
    setUserMessage: Dispatch<SetStateAction<IUserData>>
}

const SizeOptions: FC<SizeOptionsProps> = ({userMessage, setUserMessage}) => {
    return <Select onValueChange={(value) => {
        setUserMessage({
            ...userMessage,
            data: {
                ...userMessage.data,
                size: value
            }
        } as IUserData)
    }}>
        <SelectTrigger className="w-[150px] h-7 focus-visible:ring-0, focus-visible:ring-transparent">
            <SelectValue placeholder="Resolution"/>
        </SelectTrigger>
        <SelectContent>
            {resolutions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
}

export default SizeOptions;