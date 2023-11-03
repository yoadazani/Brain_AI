import React, {Dispatch, FC, SetStateAction} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {IUserData} from "@/interfaces/IUserData";
import {amountOptions} from "@/data/amountOptions";

type AmountOptionProps = {
    userMessage: IUserData
    setUserMessage: Dispatch<SetStateAction<IUserData>>
}

const AmountOptions: FC<AmountOptionProps> = ({userMessage, setUserMessage}) => {
    return <Select onValueChange={(value) => setUserMessage({
        ...userMessage,
        data: {
            ...userMessage.data,
            n: Number(value)
        }
    })}>
        <SelectTrigger className="w-[150px] h-7 focus-visible:ring-0, focus-visible:ring-transparent">
            <SelectValue placeholder="Select Amount" />
        </SelectTrigger>
        <SelectContent>
            {amountOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>

}

export default AmountOptions;