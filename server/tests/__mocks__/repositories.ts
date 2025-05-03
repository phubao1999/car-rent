export const findAllMock = jest.fn();
export const findByIdMock = jest.fn();
export const findOverlappingBookingsMock = jest.fn();
export const countOverlappingBookingsMock = jest.fn();
export const createMock = jest.fn();

export const CarRepository = jest.fn().mockImplementation(() => ({
  findAll: findAllMock,
  findById: findByIdMock,
}));

export const BookingRepository = jest.fn().mockImplementation(() => ({
  findOverlappingBookings: findOverlappingBookingsMock,
  countOverlappingBookings: countOverlappingBookingsMock,
  create: createMock,
}));
