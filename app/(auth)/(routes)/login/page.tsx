"use client"

import {useForm} from "react-hook-form";
import {KeyRound, MailOpen} from "lucide-react"
import {FaGithub, FaGoogle} from "react-icons/fa";

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {loginSchema} from "@/constants/auth/loginConstant"

import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {toast} from "@/components/ui/use-toast";
import {useState} from "react";
import {ButtonLoader} from "@/components/app/ButtonLoader";
import Link from "next/link";

const Login = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const isLoading = form.formState.isSubmitting
    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            setLoading(true)
            const signInResponse = await signIn("credentials", {
                ...data,
                redirect: false,
            })

            if (!signInResponse?.ok) {
                return toast({
                    title: "Error",
                    description: signInResponse?.error,
                    variant: "destructive",
                    duration: 3000
                })
            }

            toast({
                title: "Success",
                description: "You have been logged in successfully",
                variant: "default",
                className: "bg-green-400",
                duration: 3000
            })

            router.push("/dashboard")
        } catch (error: any) {
            alert(error.response.data)
        } finally {
            form.reset()
            setLoading(false)
        }

    }

    const OAuthLogin = async (provider: string) => {
        try {
            await signIn(provider, {
                callbackUrl: "/dashboard"
            })

        } catch (error: any) {
            alert(error.response.data)
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
                <div className="flex flex-col md:flex-row justify-center md:justify-between px-5">
                    <div className="flex space-x-2 text-sm">
                        <p className="font-normal">Forget your password?</p>
                        <Link
                            href={"/resetPassword"}
                            className="text-blue-500"
                        >
                            click here
                        </Link>
                    </div>
                    <div className="flex space-x-2 text-sm">
                        <p className="font-normal">Don't have an account?</p>
                        <Link
                            href={"/register"}
                            className="text-blue-500"
                        >
                            Sign-up
                        </Link>
                    </div>
                </div>
                <div className="flex w-full justify-center items-center space-x-1">
                    <div className="border border-dashed border-zinc-400 h-[0.2px] w-full"/>
                    <span className="font-mono font-bold text-zinc-500">OR</span>
                    <div className="border border-dashed border-zinc-400 h-[0.2px] w-full"/>
                </div>

                <div className="flex space-x-5 justify-center">
                    <FaGithub className="cursor-pointer text-3xl" onClick={() => OAuthLogin("github")}/>
                    <FaGoogle className="cursor-pointer text-3xl text-red-400" onClick={() => OAuthLogin("google")}/>
                </div>
                <Button
                    type="submit"
                    variant="premium"
                    className="min-w-[150px]"
                >
                    {loading ? <ButtonLoader/> : "Login"}
                </Button>
            </form>
        </Form>
    )
}

export default Login