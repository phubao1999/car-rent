import request from 'supertest';
import app from '../src/app';
// import { Booking, Car, Season } from '../src/models';
import { connectDBForUT, disconnectDB } from '../src/utils/db.util';

jest.mock('../src/models', () => ({
  Booking: {
    aggregate: jest.fn(),
  },
  Car: {
    find: jest.fn().mockResolvedValue([]),
    insertMany: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Season: {
    find: jest.fn().mockResolvedValue([]),
    insertMany: jest.fn(),
  },
}));

beforeAll(async () => {
  await connectDBForUT();
});

afterAll(async () => {
  await disconnectDB();
});

describe('GET /available-cars', () => {
  // it('should return a list of available cars with remaining stock and pricing', async () => {
  //   // Mock the Booking.aggregate method
  //   (Booking.aggregate as jest.Mock).mockResolvedValue([
  //     { _id: 'car123', bookingCount: 2 },
  //   ]);

  //   // Mock the Car.find method
  //   (Car.find as jest.Mock).mockResolvedValue([
  //     {
  //       _id: 'car123',
  //       brand: 'Toyota',
  //       model: 'Corolla',
  //       stock: 5,
  //       offSeasonPrice: 100,
  //       toObject: jest.fn().mockReturnValue({
  //         _id: 'car123',
  //         brand: 'Toyota',
  //         model: 'Corolla',
  //         stock: 5,
  //       }),
  //     },
  //   ]);

  //   const response = await request(app)
  //     .get('/available-cars')
  //     .query({ startDate: '2025-05-01', endDate: '2025-05-05' });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual([
  //     expect.objectContaining({
  //       _id: 'car123',
  //       brand: 'Toyota',
  //       model: 'Corolla',
  //       stock: 5,
  //       remainingStock: 3, // 5 stock - 2 bookings
  //       totalPrice: expect.any(Number),
  //       averagePrice: expect.any(Number),
  //     }),
  //   ]);
  // });

  it('should return 400 if startDate or endDate is missing', async () => {
    const response = await request(app).get('/api/cars/available').query({});

    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Start date and end date are required.',
    });
  });

  // it('should return 400 if startDate is after endDate', async () => {
  //   const response = await request(app)
  //     .get('/available-cars')
  //     .query({ startDate: '2025-05-05', endDate: '2025-05-01' });

  //   expect(response.status).toBe(400);
  //   expect(response.body).toEqual({
  //     message: 'Start date must be before end date.',
  //   });
  // });

  // it('should return 500 if an error occurs', async () => {
  //   // Mock the Car.find method to throw an error
  //   (Car.find as jest.Mock).mockRejectedValue(new Error('Database error'));

  //   const response = await request(app)
  //     .get('/available-cars')
  //     .query({ startDate: '2025-05-01', endDate: '2025-05-05' });

  //   expect(response.status).toBe(500);
  //   expect(response.body).toEqual({
  //     message: 'Failed to fetch available cars.',
  //   });
  // });
});
