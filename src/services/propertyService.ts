import { Op } from 'sequelize';
import { IPropertyQuery } from '../interfaces/property';
import { Booking, Property } from '../models';
import { HttpException } from '../utils/http.exceptions';

 class PropertyService {
  public async getAll(query: IPropertyQuery) {
    const { page = 1, limit = 10, price, available_from, available_to } = query;
    const offset = (page - 1) * limit;
    const filter: any = {};

    if (price) {
      filter.price_per_night = price;
    }
    if (available_from && available_to) {
      filter.available_from = { [Op.lte]: new Date(available_from) };
      filter.available_to = { [Op.gte]: new Date(available_to) };
    }
    const total = await Property.count({ where: filter });
    const properties = await Property.findAll({
      where: filter,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });
  
    return{ properties,
      page,
      limit,  
        total 
    }; 

  }

  public async getAvailability(id: number) {
    const property = await Property.findByPk(id);
    if (!property) {
      throw new HttpException (404, "Property not found");
    }

    const bookings = await Booking.findAll({
      where: { property_id: id },
      order: [["start_date", "ASC"]],
    });

    const availableFrom = new Date(property.available_from);
    const availableTo = new Date(property.available_to);

    let currentStart = availableFrom;
    const availableRanges: { start: Date; end: Date }[] = [];

    for (const booking of bookings) {
      const bookingStart = new Date(booking.start_date);
      const bookingEnd = new Date(booking.end_date);

      if (currentStart < bookingStart) {
        availableRanges.push({ start: currentStart, end: bookingStart });
      }

      // move current start forward to the end of this booking
      if (bookingEnd > currentStart) {
        currentStart = bookingEnd;
      }
    }

    // after the last booking
    if (currentStart < availableTo) {
      availableRanges.push({ start: currentStart, end: availableTo });
    }

    return availableRanges;
  }
}

export const propertyService = new PropertyService();

