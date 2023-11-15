import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

import {KeyRound} from "lucide-react"
import {Button} from "@/components/ui/button";
import * as z from "zod"
import {resetPasswordSchema} from "@/constants/auth/resetPasswordConstant";
import {zodResolver} from "@hookform/resolvers/zod";
import {useQueryString} from "@/hooks/useQueryString";
import {findUser} from "@/services/auth/findUser";
import axios from "axios";
import {encode} from "base-64";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";


export const ResetPassForm = () => {
    const router = useRouter()
    const {getQueryString} = useQueryString()
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        }
    })


    const handleSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
        const userEmail = getQueryString("email") || ""
        const userInfo = await findUser(userEmail)

        if (userInfo) {
            try {
                const { user } = userInfo
                await axios.put(`http://localhost:3000/api/users/${user?.id}`, {
                    ...user,
                    password: encode(values.newPassword)
                })
                toast({
                    title: "Success",
                    description: "Password updated successfully",
                    variant: "default",
                    className: "bg-green-400",
                    duration: 3000,
                })

                router.push("/user/login")
            } catch (error) {
                console.log(error)
            } finally {
                form.reset()
            }
        }

    }


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full p-4 px-2 md:px-6 space-y-3"
            >
                <FormField
                    name="newPassword"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div
                                    className="flex items-center gap-x-2 w-full p-2 border rounded-sm focus-within:shadow-md">
                                    <KeyRound/>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="new password"
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div
                                    className="flex items-center gap-x-2 w-full p-2 border rounded-sm focus-within:shadow-md">
                                    <KeyRound/>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="confirm password"
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
                    className="bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400"
                >
                    Reset now
                </Button>
            </form>
        </Form>
    );
}