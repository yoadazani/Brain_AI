"use client"

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as z from "zod"

import {loginSchema} from "./constants"
import {zodResolver} from "@hookform/resolvers/zod";

const Login = () => {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const isLoading = form.formState.isSubmitting
    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        console.log(data)
        form.reset()
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 drop-shadow-md space-y-4 bg-white"
            >
                <h1 className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-blue-600 text-transparent">
                    Login to your account
                </h1>
                <FormField
                    name="email"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    {...field}
                                />
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
                                <Input
                                    className="outline-none focus-visible:ring-0 focus-visible:ring-transparent mb-4"
                                    type="password"
                                    placeholder="Your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    disabled={isLoading}
                />
                <Button type="submit"
                        className="bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400">Login</Button>
            </form>
        </Form>
    )
}

export default Login