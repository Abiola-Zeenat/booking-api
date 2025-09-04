import { propertyService } from "../../services/propertyService";
import { Property, Booking } from "../../models";
import { Op } from "sequelize";
import { HttpException } from "../../utils/http.exceptions";

jest.mock("../../models", () => ({
  Property: { count: jest.fn(), findAll: jest.fn(), findByPk: jest.fn() },
  Booking: { findAll: jest.fn() },
}));

const MockedProperty = Property as jest.Mocked<typeof Property>;

describe("PropertyService - getAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProperties = [
    { id: 1, price_per_night: 100, available_from: new Date("2025-09-01"), available_to: new Date("2025-09-30") },
    { id: 2, price_per_night: 150, available_from: new Date("2025-09-05"), available_to: new Date("2025-09-25") },
  ] as any;

  it("should return paginated properties with total count", async () => {
    MockedProperty.count.mockResolvedValue(2);
    MockedProperty.findAll.mockResolvedValue(mockProperties);

    const query = { page: 1, limit: 10 };
    const result = await propertyService.getAll(query);

    expect(MockedProperty.count).toHaveBeenCalledWith({ where: {} });
    expect(MockedProperty.findAll).toHaveBeenCalledWith({
      where: {},
      order: [["createdAt", "DESC"]],
      limit: 10,
      offset: 0,
    });

    expect(result).toEqual({
      properties: mockProperties,
      page: 1,
      limit: 10,
      total: 2,
    });
  });

  it("should apply price filter", async () => {
    MockedProperty.count.mockResolvedValue(1);
    MockedProperty.findAll.mockResolvedValue([mockProperties[0]]);

    const query = { price: 100 };
    const result = await propertyService.getAll(query);

    expect(MockedProperty.count).toHaveBeenCalledWith({ where: { price_per_night: 100 } });
    expect(MockedProperty.findAll).toHaveBeenCalledWith({
      where: { price_per_night: 100 },
      order: [["createdAt", "DESC"]],
      limit: 10,
      offset: 0,
    });

    expect(result.properties.length).toBe(1);
  });

  it("should apply availability date filter", async () => {
    MockedProperty.count.mockResolvedValue(1);
    MockedProperty.findAll.mockResolvedValue([mockProperties[1]]);

    const query = { available_from: new Date("2025-09-06"), available_to: new Date("2025-09-20") };
    const result = await propertyService.getAll(query);

    expect(MockedProperty.count).toHaveBeenCalledWith({
      where: {
        available_from: { [Op.lte]: new Date("2025-09-06") },
        available_to: { [Op.gte]: new Date("2025-09-20") },
      },
    });

    expect(result.properties.length).toBe(1);
  });

  it("should return empty array if no properties match", async () => {
    MockedProperty.count.mockResolvedValue(0);
    MockedProperty.findAll.mockResolvedValue([]);

    const query = { price: 999 };
    const result = await propertyService.getAll(query);

    expect(result).toEqual({
      properties: [],
      page: 1,
      limit: 10,
      total: 0,
    });
  });
});

describe("PropertyService - getAvailability", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProperty = {
    id: 1,
    available_from: new Date("2025-09-01"),
    available_to: new Date("2025-09-30"),
  } as any;

  it("should throw 404 if property not found", async () => {
    (Property.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(propertyService.getAvailability(1))
      .rejects.toThrow(new HttpException(404, "Property not found"));
  });

  it("should return full range if no bookings", async () => {
    (Property.findByPk as jest.Mock).mockResolvedValue(mockProperty);
    (Booking.findAll as jest.Mock).mockResolvedValue([]);

    const result = await propertyService.getAvailability(1);

    expect(result).toEqual([
      { start: new Date("2025-09-01"), end: new Date("2025-09-30") },
    ]);
  });

  it("should return available ranges between bookings", async () => {
    (Property.findByPk as jest.Mock).mockResolvedValue(mockProperty);

    const mockBookings = [
      { start_date: new Date("2025-09-05"), end_date: new Date("2025-09-10") },
      { start_date: new Date("2025-09-15"), end_date: new Date("2025-09-20") },
    ];

    (Booking.findAll as jest.Mock).mockResolvedValue(mockBookings);

    const result = await propertyService.getAvailability(1);

    expect(result).toEqual([
      { start: new Date("2025-09-01"), end: new Date("2025-09-05") },
      { start: new Date("2025-09-10"), end: new Date("2025-09-15") },
      { start: new Date("2025-09-20"), end: new Date("2025-09-30") },
    ]);
  });
});

