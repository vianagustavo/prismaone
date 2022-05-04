import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class ListEnrollments {
  async handle(request: Request, response: Response) {
    const info = await prismaClient.enrollment.findMany({
      select: {
        enrollment: true,
        status: true,
      },
    });

    return response.json(info);
  }
}
