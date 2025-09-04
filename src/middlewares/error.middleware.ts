import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/http.exceptions';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    return res.status(Number(err.statusCode)).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
};