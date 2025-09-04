import { Router } from 'express';
import { cancelBooking, createBooking, updateBooking } from '../controllers/bookingController';
import { createBookingValidator, updateBookingValidator } from '../validators/booking.validator';


const router = Router();

router.post('/', createBookingValidator, createBooking);
router.delete('/:id', cancelBooking);
router.put('/', updateBookingValidator, updateBooking);

export default router;
