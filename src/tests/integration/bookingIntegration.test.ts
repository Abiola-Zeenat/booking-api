import request from 'supertest';
import app from '../../server/app';
import { sequelize } from '../../db/sequelize';
import { Booking, Property } from '../../models';

describe("Booking API Integration Tests", () => {
  let propertyId: number;
  let bookingId: number;

  beforeAll(async () => {
    await sequelize.sync({ force: true }); // reset DB
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    // Create a property for bookings
    const property = await Property.create({
      title: "Luxury Apartment",
      description: "A beautiful 2-bedroom apartment",
      price_per_night: 100,
      available_from: new Date("2025-09-01"),
      available_to: new Date("2025-09-30"),
    });
    propertyId = property.id;
  });

  afterEach(async () => {
    await Booking.destroy({ where: {} });
    await Property.destroy({ where: {} });
  });

  
  it("POST /bookings - should create a booking", async () => {
    const payload = {
      property_id: propertyId,
      user_name: "John Doe",
      start_date: "2025-09-05",
      end_date: "2025-09-10",
    };

    const res = await request(app)
      .post("/bookings")
      .send(payload)
      .expect(201);

    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("user_name", "John Doe");
    bookingId = res.body.data.id;
  });

  it("POST /bookings - should fail if booking dates overlap", async () => {
    // First booking
    await Booking.create({
      property_id: propertyId,
      user_name: "Alice",
      start_date: new Date("2025-09-05"),
      end_date: new Date("2025-09-10"),
    });

    // Overlapping booking
    const payload = {
      property_id: propertyId,
      user_name: "Bob",
      start_date: "2025-09-08",
      end_date: "2025-09-12",
    };

    const res = await request(app)
      .post("/bookings")
      .send(payload)
      .expect(400);

    expect(res.body.message).toBe("Selected dates overlap with an existing booking");
  });

  
  it("PATCH /bookings - should update a booking", async () => {
    const booking = await Booking.create({
      property_id: propertyId,
      user_name: "Jane Doe",
      start_date: new Date("2025-09-11"),
      end_date: new Date("2025-09-15"),
    });

    const payload = {
      id: booking.id,
      user_name: "Jane Smith",
      start_date: "2025-09-12",
      end_date: "2025-09-16",
    };

    const res = await request(app)
      .put("/bookings")
      .send(payload)
      .expect(200);

    expect(res.body.data).toHaveProperty("user_name", "Jane Smith");
    expect(new Date(res.body.data.start_date)).toEqual(new Date("2025-09-12"));
  });


  it("DELETE /bookings/:id - should cancel a booking", async () => {
    const booking = await Booking.create({
      property_id: propertyId,
      user_name: "Mike",
      start_date: new Date("2025-09-20"),
      end_date: new Date("2025-09-25"),
    });

    const res = await request(app)
      .delete(`/bookings/${booking.id}`)
      .expect(200);

    expect(res.body).toEqual({ message: "Booking cancelled successfully" });
  });

  it("DELETE /bookings/:id - should return 404 if booking not found", async () => {
    const res = await request(app)
      .delete("/bookings/9999")
      .expect(404);

    expect(res.body.message).toBe("Booking not found");
  });
});
