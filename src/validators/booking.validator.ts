import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validate } from '../utils/validate';

export const createBookingValidator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    property_id: Joi.number().required().messages({
      'number.empty': 'property id is required.',
    }),
    user_name: Joi.string().required().messages({
      'string.empty': 'Name of Booker is required.',
    }),
    start_date: Joi.date().greater('now').required().messages({
      'date.base': 'Start date must be a valid date.',
      'any.required': 'Start date is required.',
    'date.greater': 'Start date must be in the future.',

    }),
    end_date: Joi.date().greater(Joi.ref('start_date')).required().messages({
      'date.base': 'End date must be a valid date.',
      'any.required': 'End date is required.',
        'date.greater': 'End date must be after start date.',
    }),
  });

  await validate(schema, request, response, next);
};

export const updateBookingValidator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    id: Joi.number().required().messages({
      'number.empty': 'Booking id is required.',
    }),
    user_name: Joi.string().optional(),
    start_date: Joi.date().greater('now').optional().messages({
      'date.base': 'Start date must be a valid date.',
    'date.greater': 'Start date must be in the future.',

    }),
    end_date: Joi.date().greater(Joi.ref('start_date')).optional().messages({
      'date.base': 'End date must be a valid date.',
        'date.greater': 'End date must be after start date.',
    }),
  });

  await validate(schema, request, response, next);
};
