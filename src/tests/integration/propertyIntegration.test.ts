import request from 'supertest';
import { sequelize } from '../../db/sequelize';
import { Property } from '../../models';
import app from '../../server/app';

describe("Property API Integration Tests", () => {

  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset DB
  });

  afterAll(async () => {
    await sequelize.close(); // Close DB connection
  });

  let propertyId: number;

  // Seed a property before tests
  beforeEach(async () => {
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
    await Property.destroy({ where: {} }); // Clean DB
  });

  it("GET /properties - should return all properties", async () => {
  const res = await request(app)
    .get("/properties")
    .expect(200);

  expect(res.body.data.properties).toHaveLength(1);  // <-- use data.properties
  expect(res.body.data.total).toBe(1);
  expect(res.body.data.properties[0]).toHaveProperty("title", "Luxury Apartment");
});

it("GET /properties/:id/availability - should return full available range if no bookings", async () => {
  const res = await request(app)
    .get(`/properties/${propertyId}/availability`)
    .expect(200);

  expect(res.body.data).toEqual([
    { start: new Date("2025-09-01").toISOString(), end: new Date("2025-09-30").toISOString() } // <-- use data
  ]);
});
});
