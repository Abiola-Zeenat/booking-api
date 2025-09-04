import { Op } from 'sequelize';
import { BookingAttributes } from '../interfaces/booking';
import Booking from '../models/booking';
import Property from '../models/property';
import { HttpException } from '../utils/http.exceptions';

 class BookingService {
  public async createBooking(payload: BookingAttributes) {
    const property = await Property.findByPk(payload.property_id);
    if (!property) {
      throw new HttpException(404, 'Property not found');
    }

    const startDate = new Date(payload.start_date);
    const endDate = new Date(payload.end_date);

    // ensure booking is within property availability
    if (
      startDate < new Date(property.available_from) ||
      endDate > new Date(property.available_to)
    ) {
      throw new HttpException(400, 'Dates are outside property availability');
    }

    // Ensure no overlap with existing bookings
    const overlappingBooking = await Booking.findOne({
      where: {
        property_id: payload.property_id,
        start_date: { [Op.lt]: endDate },
        end_date: { [Op.gt]: startDate },
      },
    });

    if (overlappingBooking) {
      throw new HttpException(400,
        'Selected dates overlap with an existing booking'
      );
    }
    
    const booking = await Booking.create({
      property_id: payload.property_id,
      user_name: payload.user_name,
      start_date: startDate,
      end_date: endDate,
    });

    return booking;
  }

  public async cancelBooking(id: number) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new HttpException(404, 'Booking not found');
    }

    await booking.destroy();
    return { message: 'Booking cancelled successfully' };
  }

   public async updateBooking(
    payload: Partial<BookingAttributes>,
  ) {
    const booking = await Booking.findByPk(payload.id);
    if (!booking) throw new HttpException(404, "Booking not found");

    const property = await Property.findByPk(booking.property_id);
    if (!property) throw new HttpException(404, "Property not found");

    if(payload.start_date && payload.end_date){
        const startDate = new Date(payload.start_date);
        const endDate = new Date(payload.end_date);
    if (
      startDate < new Date(property.available_from) ||
      endDate > new Date(property.available_to)
    ) {
      throw new HttpException(400, "Dates are outside property availability");
    }

    const overlappingBooking = await Booking.findOne({
      where: {
        property_id: booking.property_id,
        id: { [Op.ne]: payload.id }, // exclude the current booking
        start_date: { [Op.lt]: endDate },
        end_date: { [Op.gt]: startDate },
      },
    });

    if (overlappingBooking) {
      throw new HttpException(400, "Selected dates overlap with another booking");
    }
    }
    booking.update(payload);
    await booking.save();
    return booking;
  }

}

export const bookingService = new BookingService();
