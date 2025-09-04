import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = async (
  schema: Joi.ObjectSchema<any>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err: any) {
    return res.status(400).json({ status: 'error', message: `${err.details[0].message}` });
  }
};
