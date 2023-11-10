import React, {Dispatch, FC, SetStateAction} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {IUserData} from "@/interfaces/IUserData";
import {resolutions} from "@/data/resolutions";
import {ImageOptionProps} from "@/types/pages/image-generator/imageOptionProps";


const SizeOptions: FC<ImageOptionProps> = ({userMessage, setUserMessage}) => {
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