import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../src/app";

process.env.DATABASE_URL =
  "postgresql://root:admin@localhost:5432/prismaonetest?schema=public";

const prismaClient = new PrismaClient();
beforeAll(() => {
  return prismaClient.$connect();
});

afterAll(() => {
  return prismaClient.user.deleteMany();
});

export const superAppRequest = request(app);
