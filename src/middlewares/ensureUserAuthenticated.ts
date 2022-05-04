import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export interface IUserIdWithRequest extends Request {
  user_id: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      process.env.PASSWORD_KEY as string
    ) as IPayload;
    (request as IUserIdWithRequest).user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
