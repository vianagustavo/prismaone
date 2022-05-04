import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { InvalidArgument } from "../app";
import { prismaClient } from "../database/prismaClient";

interface IAuthenticateRequest {
  login: string;
  password: string;
}

async function execute({ login, password }: IAuthenticateRequest) {
  const user = await prismaClient.user.findFirst({ where: { login } });

  if (!user) {
    throw new InvalidArgument("User incorrect!");
  }
  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Incorrect password");
  }

  const token = sign(
    {
      login: user.login,
    },
    process.env.PASSWORD_KEY as string,
    {
      subject: user.id,
      expiresIn: "10m",
    }
  );

  return token;
}

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { login, password } = request.body;
    const tokenJwt = await execute({ login, password });
    const responseJwt = {
      token: tokenJwt,
    };

    return response.json(responseJwt);
  }
}
