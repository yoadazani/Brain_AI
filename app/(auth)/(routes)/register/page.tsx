"use client"

import {useForm} from "react-hook-form";
import {KeyRound, MailOpen, User2} from "lucide-react"

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {registerSchema} from "@/constants/auth/registerConstant"

import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";

const Register = () => {

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const isLoading = form.formState.isSubmitting
    const onSubmit = async (formData: z.infer<typeof registerSchema>) => {
        try {
            const res = await axios.post('/api/register', formData)
            alert(res.data)
        } catch (error: any) {
            alert(error.response.data)
        } finally {
            form.reset()
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 drop-shadow-md space-y-4 bg-white mt-5"
            >
                <h1 className="text-2xl font-bold text-zinc-500">
                    Create your account
                </h1>
                <FormField
                    name="name"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div
                                    className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md p-1 px-2">
                                    <User2/>
                                    <Input
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        type="text"
                                        placeholder="Your name"
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
                <Button type="submit"
                        className="bg-gradient-to-r from-pink-400 to-blue-400">Register</Button>
            </form>
        </Form>
    )
}

export default Register