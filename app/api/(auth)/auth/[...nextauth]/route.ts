import NextAuth, {SessionStrategy} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import client, {connectToDatabase} from "@/lib/getPrismaClient";
import {findUser} from "@/services/actions/userActions/findUser";
import bcrypt from "bcrypt";


import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import {JwtPayload} from "jsonwebtoken";


export const authOptions = {
    adapter: PrismaAdapter(client),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            id: "credentials",
            type: "credentials",
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials, req) {
                const {email, password} = credentials as { email: string, password: string }

                if (!email || !password) {
                    throw new Error('Please provide an email and password')
                }

                await connectToDatabase()
                const user = await findUser(email)
                if (!user) {
                    throw new Error('User not found')
                }

                const verifyPassword = bcrypt.compareSync(password, user.hashedPassword)
                if (!verifyPassword) {
                    throw new Error('Incorrect password')
                }

                return user
            }
        })
    ],
    callbacks: {
        async jwt({token, trigger, session, user}: JwtPayload) {
            if (trigger === "update" && session) {
                token = {
                    ...token,
                    ...session
                }
            }
            if (user) {
                return {
                    ...token,
                    uid: user.id
                }
            }

            return token
        },
        async session({session, token}: JwtPayload) {
            if (token) session.user.id = token.uid

            session = {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    email: token.email,
                    image: token.picture
                }
            }

            return session
        }
    },
    session: {
        strategy: 'jwt' as SessionStrategy,
        maxAge: 60 * 60 * 24 // 24 hours
    },
    pages: {signIn: '/login'},
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}