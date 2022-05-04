import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, password, login } = request.body;

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        password: passwordHash,
        name,
        login,
      },
      select: {
        id: true,
        login: true,
        created_at: true,
        updated_at: true,
        name: true,
      },
    });
    return response.json(user);
  }
}
