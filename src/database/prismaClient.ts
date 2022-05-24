import { PrismaClient } from "@prisma/client";

console.log({ database: process.env.DATABASE_URL });
const prismaClient = new PrismaClient();

export { prismaClient };
