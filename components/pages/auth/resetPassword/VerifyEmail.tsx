import {Form, FormControl, FormField, FormItem, FormMessage} from "../../../../brain/components/ui/form";
import {MailOpen} from "lucide-react";
import {Button} from "../../../../brain/components/ui/button";
import {useForm} from "react-hook-form";

import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {verifyEmailSchema} from "../../../../brain/constants/auth/verifyEmailConstant";
import {signal} from "@preact/signals"
import {VerificationFormProps} from "../../../../brain/types/pages/auth/resetPassword/verificationFormProps";
import {useQueryString} from "../../../../brain/hooks/useQueryString";
import {confirmEmail} from "../../../../brain/services/actions/authActions/confirmEmail";
import {toast} from "../../../../brain/components/ui/use-toast";
import {useState} from "react";
import {sleep} from "../../../../brain/utils/sleep";
import {ButtonLoader} from "../../../../brain/components/app/ButtonLoader";

export const OTP = signal<string>("")

export const VerifyEmail = ({setUserEmail}: VerificationFormProps) => {

    const {createQueryString} = useQueryString()
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof verifyEmailSchema>>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof verifyEmailSchema>) => {
        setLoading(true)
        await sleep(1500)
        const confirmationOTP = await confirmEmail(data.email)
        if (confirmationOTP.status === "error") {
            toast({
                title: "Error",
                description: confirmationOTP.message,
                variant: "destructive",
                duration: 3000
            })
        } else {
            OTP.value = confirmationOTP.message
            setUserEmail(data.email)
            createQueryString("emailConfirmed", "1")
        }

        setLoading(false)
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <FormField
                name="email"
                control={form.control}
                render={({field}) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div
                                className="flex items-center gap-x-2 w-full p-2 border rounded-sm focus-within:shadow-md">
                                <MailOpen/>
                                <input
                                    {...field}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full"
                                />
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button
                type="submit"
                variant="premium"
                className="min-w-[150px]"
            >
                {loading ? <ButtonLoader /> : "Submit"}
            </Button>
        </form>
    </Form>
}