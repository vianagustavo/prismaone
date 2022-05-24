import { Enrollment } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { prismaClient } from "../database/prismaClient";

export class CreateEnrollmentController {
  async handle(request: Request, response: Response) {
    const enrollmentQuantity = 10;
    const enrollmentList: Enrollment[] = [];
    for (let index = 0; index < enrollmentQuantity; index++) {
      const enrollment = (
        Math.floor(Math.random() * (9999999999999 - 1000000000000 + 1)) +
        1000000000000
      ).toString();
      await prismaClient.enrollment.create({
        data: {
          enrollment,
          status: Math.random() < 0.5,
          id: uuid(),
          created_at: new Date(),
          updated_at: new Date()
        }
      });
    }
    const info = await prismaClient.enrollment.findMany();

    return response.json(info);
  }
}
