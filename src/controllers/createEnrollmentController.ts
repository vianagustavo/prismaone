import { Enrollment } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

export class CreateEnrollmentController {
  async handle(request: Request, response: Response) {
    const enrollmentQuantity = 10;
    const enrollmentList: Enrollment[] = [];
    for (let index = 0; index < enrollmentQuantity; index++) {
      const enrollment = (
        Math.floor(Math.random() * (9999999999999 - 1000000000000 + 1)) +
        1000000000000
      ).toString();
      const enrollmentEntity: Enrollment = {
        enrollment,
        status: Math.random() < 0.5,
        id: uuid(),
        created_at: new Date(),
        updated_at: new Date()
      };
      enrollmentList.push(enrollmentEntity);
    }
    return response.json(enrollmentList);
  }
}
