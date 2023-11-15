"use client"

import {useForm} from "react-hook-form";
import {KeyRound, MailOpen} from "lucide-react"

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {loginSchema} from "@/constants/auth/loginConstant"

import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";


const Login = () => {

    const router = useRouter()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const isLoading = form.formState.isSubmitting
    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        console.log(data)
        try {
            const res = await axios.post('/api/auth/login', data)

            console.log(res.status)
            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: "Login successfully",
                    className: "bg-green-400",
                    variant: "default",
                    duration: 3000,
                })
                router.push("/dashboard")
            }
        } catch (error: any) {
            console.log(error)
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
                duration: 3000,
            })
        } finally {
            form.reset()
        }

    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 drop-shadow-md space-y-4 bg-white"
            >
                <h1 className="text-2xl font-bold text-zinc-500">
                    Login to your account
                </h1>
                <FormField
                    name="email"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div
                                    className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                    <MailOpen/>
                                    <Input
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    disabled={isLoading}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div
                                    className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md p-1 px-2">
                                    <KeyRound/>
                                    <Input
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        type="password"
                                        placeholder="Your password"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    disabled={isLoading}
                />
                <div className="flex space-x-2">
                    <span className="font-mono">Forget your password?</span>
                    <p className="cursor-pointer text-blue-700" onClick={() => router.push("/user/resetPassword")}>click
                        here</p>
                </div>
                <Button
                    type="submit"
                    className="bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400"
                >
                    Login
                </Button>
            </form>
        </Form>
    )
}

export default Login