import {ChangeEvent, FC, FormEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {Input} from "../../../../brain/components/ui/input";
import {Button} from "../../../../brain/components/ui/button";
import {toast} from "../../../../brain/components/ui/use-toast";
import {useQueryString} from "../../../../brain/hooks/useQueryString";
import {OtpVerificationProps} from "../../../../brain/types/pages/auth/resetPassword/OtpVerificationProps";
import {OTP} from './VerifyEmail';
import {ButtonLoader} from "../../../../brain/components/app/ButtonLoader";
import {sleep} from "../../../../brain/utils/sleep";

let CURRENT_OTP_INDEX = 0
export const OtpInput: FC<OtpVerificationProps> = ({userEmail}) => {
    const {createQueryString} = useQueryString()

    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
    const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target

        const new_otp: string[] = [...otp]

        new_otp[CURRENT_OTP_INDEX] = value.substring(value.length - 1)

        if (!value) setActiveOtpIndex(CURRENT_OTP_INDEX - 1)
        else setActiveOtpIndex(CURRENT_OTP_INDEX + 1)

        setOtp(new_otp)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        setLoading(true)
        await sleep(1500)
        const otpInput = otp.join("")
        if (otpInput !== OTP.value) {
            toast({
                title: 'Error',
                description: 'Invalid OTP',
                variant: "destructive",
                duration: 3000,
            })
            return
        }
        toast({
            title: 'Success',
            description: 'OTP verified successfully',
            variant: "default",
            className: "bg-green-400",
            duration: 3000,
        })

        createQueryString("email", userEmail)

        createQueryString("isVerified", "1")

        OTP.value = ""
        setLoading(false)
    }

    const goToPrevInput = ({key}: KeyboardEvent<HTMLInputElement>, index: number) => {
        CURRENT_OTP_INDEX = index
        if (key === "Backspace") {
            setActiveOtpIndex(index - 1)
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOtpIndex]);

    return (
        <div className="w-full h-full ">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-[80%] m-auto"
            >
                <div className="flex space-x-2">
                    {otp.map((_, index) => (
                        <Input
                            key={index}
                            ref={activeOtpIndex === index ? inputRef : null}
                            type='number'
                            value={otp[index]}
                            onChange={handleChange}
                            onKeyDown={e => goToPrevInput(e, index)}
                            className="text-center text-lg text-zinc-500"
                        />
                    ))}
                </div>
                <Button
                    type="submit"
                    className="min-w-[150px]"
                >
                    {loading ? <ButtonLoader/> : "Verify Account"}
                </Button>
            </form>
        </div>
    )
}