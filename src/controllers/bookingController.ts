import { Request, Response, NextFunction } from 'express';
import { bookingService } from '../services/bookingService';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ 
        data: booking,
        status: 'success',
        message: 'Booking created successfully'
     });
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const { id } = req.params;
    const result = await bookingService.cancelBooking(Number(id));
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await bookingService.updateBooking(req.body);
    res.status(200).json({
        data: booking,
        status: 'success',
        message: 'Booking updated successfully'
    });
  } catch (err) {
    next(err);
  }
};