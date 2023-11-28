"use server"

import {findUser} from "@/services/actions/userActions/findUser";
import {generateOtp} from "@/utils/generateOtp";
import {sendMail} from "@/lib/mailSender";
import {IConfirmEmailResponse} from "@/interfaces/auth/IConfirmEmailResponse";


export const confirmEmail = async (email: string) => {
    const user = await findUser(email)

    if (!user || !user.hashedPassword) return {
        status: "error",
        message: "User not found"
    } as IConfirmEmailResponse

    const OTP = generateOtp()
    await sendMail(email, "Confirm your email", `Your OTP code is \n\n ${OTP}`)


    return {
        status: "success",
        message: OTP
    } as IConfirmEmailResponse
}