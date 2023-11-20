// @ts-nocheck
import {PrismaClient} from "@prisma/client";

let prisma: PrismaClient;
declare global {
    namespace NodeJS {
        interface Global {
            prisma: PrismaClient;
        }
    }
}

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to database");
    } catch (error) {
        console.error(error);
        throw new Error("Could not connect to database");
    }
}

export default prisma;