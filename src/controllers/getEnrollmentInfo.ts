import { Request, Response } from "express";
import { NotFound } from "../app";
import { prismaClient } from "../database/prismaClient";

export class GetEnrollmentInfo {
  async handle(request: Request, response: Response) {
    const { enrollment } = request.params;

    const info = await prismaClient.enrollment.findFirst({
      where: { enrollment },
    });
    if (!info) {
      throw new NotFound("Enrollment not found.");
    }

    return response.json({ status: info.status, enrollment: info.enrollment });
  }
}
