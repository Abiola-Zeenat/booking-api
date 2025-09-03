import Property from './property';
import Booking from './booking';

// setup associations
Property.associate();
Booking.associate();

export { Property, Booking };
