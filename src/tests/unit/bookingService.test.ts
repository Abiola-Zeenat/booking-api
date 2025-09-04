import { bookingService } from "../../services/bookingService";
import { Property, Booking } from "../../models";
import { HttpException } from "../../utils/http.exceptions";
import { afterEach, describe, jest } from '@jest/globals';


// Create typed mocked models
const MockedProperty = Property as jest.Mocked<typeof Property>;
const MockedBooking = Booking as jest.Mocked<typeof Booking>;

// Mock sequelize models
jest.mock("../../models", () => ({
  Property: { findByPk: jest.fn() },
  Booking: { findOne: jest.fn(), create: jest.fn(), findByPk: jest.fn(), destroy: jest.fn()},
}));

describe("BookingService - createBooking", () => {
  const mockProperty = {
    id: 1,
    available_from: new Date("2025-09-01"),
    available_to: new Date("2025-09-30"),
  } as any;

  const mockPayload = {
    id: 0,
    property_id: 1,
    user_name: "John Doe",
    start_date: new Date("2025-09-05"),
    end_date: new Date("2025-09-10"),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw 404 if property not found", async () => {
    MockedProperty.findByPk.mockResolvedValue(null);

    await expect(bookingService.createBooking(mockPayload))
      .rejects.toThrow(new HttpException(404, "Property not found"));
  });

  it("should throw 400 if dates are outside property availability", async () => {
    MockedProperty.findByPk.mockResolvedValue(mockProperty);

    const payload = {
      ...mockPayload,
      start_date: new Date("2025-08-25"),
      end_date: new Date("2025-09-05"),
    };

    await expect(bookingService.createBooking(payload))
      .rejects.toThrow(new HttpException(400, "Dates are outside property availability"));
  });

  it("should throw 400 if dates overlap with existing booking", async () => {
    MockedProperty.findByPk.mockResolvedValue(mockProperty);

    const mockExistingBooking = {
      id: 99,
      start_date: new Date("2025-09-05"),
      end_date: new Date("2025-09-10"),
    } as any;

    MockedBooking.findOne.mockResolvedValue(mockExistingBooking);

    await expect(bookingService.createBooking(mockPayload))
      .rejects.toThrow(new HttpException(400, "Selected dates overlap with an existing booking"));
  });

  it("should create and return booking if valid", async () => {
    MockedProperty.findByPk.mockResolvedValue(mockProperty);
    MockedBooking.findOne.mockResolvedValue(null);

    const mockCreatedBooking = {
      ...mockPayload,
    } as any;

    MockedBooking.create.mockResolvedValue(mockCreatedBooking);

    const result = await bookingService.createBooking(mockPayload);

    expect(MockedBooking.create).toHaveBeenCalledWith({
      property_id: 1,
      user_name: "John Doe",
      start_date: new Date("2025-09-05"),
      end_date: new Date("2025-09-10"),
    });

    expect(result).toEqual(mockCreatedBooking);
  });
});
describe("BookingService - cancelBooking", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw 404 if booking not found", async () => {
    MockedBooking.findByPk.mockResolvedValue(null);

    await expect(bookingService.cancelBooking(1))
      .rejects.toThrow(new HttpException(404, "Booking not found"));
  });

  it("should cancel booking if found", async () => {
    const mockBooking = {
      id: 1,
      destroy: jest.fn(),
    } as any;

    MockedBooking.findByPk.mockResolvedValue(mockBooking as unknown as Booking);

    const result = await bookingService.cancelBooking(1);

    expect(mockBooking.destroy).toHaveBeenCalled();
    expect(result).toEqual({ message: "Booking cancelled successfully" });
  });
});
describe("BookingService - updateBooking", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockBooking: Partial<Booking> = {
    id: 1,
    property_id: 1,
    update: jest.fn() as any,
    save: jest.fn() as any,
  };

  const mockProperty = {
    id: 1,
    available_from: new Date("2025-09-01"),
    available_to: new Date("2025-09-30"),
  } as any;

  it("should throw 404 if booking not found", async () => {
    MockedBooking.findByPk.mockResolvedValue(null);

    await expect(
      bookingService.updateBooking({ id: 1, start_date: new Date() })
    ).rejects.toThrow(new HttpException(404, "Booking not found"));
  });

  it("should throw 404 if property not found", async () => {
    MockedBooking.findByPk.mockResolvedValue(mockBooking as Booking);
    MockedProperty.findByPk.mockResolvedValue(null);

    await expect(
      bookingService.updateBooking({ id: 1, start_date: new Date() })
    ).rejects.toThrow(new HttpException(404, "Property not found"));
  });

  it("should throw 400 if dates are outside property availability", async () => {
    MockedBooking.findByPk.mockResolvedValue(mockBooking as Booking);
    MockedProperty.findByPk.mockResolvedValue(mockProperty);

    await expect(
      bookingService.updateBooking({
        id: 1,
        start_date: new Date("2025-08-01"),
        end_date: new Date("2025-08-10"),
      })
    ).rejects.toThrow(new HttpException(400, "Dates are outside property availability"));
  });

  it("should throw 400 if dates overlap with another booking", async () => {
    MockedBooking.findByPk.mockResolvedValue(mockBooking as Booking);
    MockedProperty.findByPk.mockResolvedValue(mockProperty);

    // Simulate overlapping booking
    const mockOverlap = { id: 2 } as any;
    MockedBooking.findOne.mockResolvedValue(mockOverlap);

    await expect(
      bookingService.updateBooking({
        id: 1,
        start_date: new Date("2025-09-05"),
        end_date: new Date("2025-09-10"),
      })
    ).rejects.toThrow(new HttpException(400, "Selected dates overlap with another booking"));
  });

  it("should update booking successfully", async () => {
    MockedBooking.findByPk.mockResolvedValue(mockBooking as Booking);
    MockedProperty.findByPk.mockResolvedValue(mockProperty);
    MockedBooking.findOne.mockResolvedValue(null);

    const payload = {
      id: 1,
      start_date: new Date("2025-09-05"),
      end_date: new Date("2025-09-10"),
      user_name: "Jane Doe",
    };

    const result = await bookingService.updateBooking(payload);

    expect(mockBooking.update).toHaveBeenCalledWith(payload);
    expect(mockBooking.save).toHaveBeenCalled();
    expect(result).toEqual(mockBooking);
  });
});
