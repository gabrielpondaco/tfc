import { NextFunction, Request, Response } from 'express';

const errors: Record<string, number> = {
  ValidationError: 400,
  NotValidBody: 401,
  NotFoundError: 404,
  InvalidTokenError: 401,
};

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errors[err.name];
  const { message } = err;
  res.status(status).json({ message });
};

export default errorMiddleware;
