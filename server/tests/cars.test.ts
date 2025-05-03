import request from 'supertest';
import app from '../src/app';
import { BookingRepository, CarRepository } from '../src/repositories';
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

jest.mock('../src/repositories', () => {
  return {
    BookingRepository: jest.fn().mockImplementation(() => ({
      findOverlappingBookings: jest.fn(),
    })),
    CarRepository: jest.fn().mockImplementation(() => ({
      findAll: jest.fn(),
    })),
  };
});

beforeAll(async () => {
  await connectDBForUT();
});

afterAll(async () => {
  await disconnectDB();
});

describe('GET Car Available', () => {
  let bookingRepositoryInstance: BookingRepository;
  let carRepositoryInstance: CarRepository;
  beforeEach(() => {
    bookingRepositoryInstance = new BookingRepository();
    carRepositoryInstance = new CarRepository();
  });
  it('should return a list of available cars with remaining stock and pricing', async () => {
    (
      bookingRepositoryInstance.findOverlappingBookings as jest.Mock
    ).mockResolvedValue([{ _id: 'car123', bookingCount: 2 }]);

    (carRepositoryInstance.findAll as jest.Mock).mockResolvedValue([
      {
        _id: 'car123',
        brand: 'Toyota',
        model: 'Corolla',
        stock: 5,
        offSeasonPrice: 100,
        toObject: jest.fn().mockReturnValue({
          _id: 'car123',
          brand: 'Toyota',
          model: 'Corolla',
          stock: 5,
        }),
      },
    ]);

    const response = await request(app)
      .get('/api/cars/available')
      .query({ startDate: '2025-05-01', endDate: '2025-05-05' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({
        _id: 'car123',
        brand: 'Toyota',
        model: 'Corolla',
        stock: 5,
        remainingStock: 3,
        totalPrice: expect.any(Number),
        averagePrice: expect.any(Number),
      }),
    ]);
  });

  it('should return 400 if startDate or endDate is missing', async () => {
    const response = await request(app).get('/api/cars/available').query({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Start date and end date are required.',
    });
  });

  it('should return 400 if startDate is after endDate', async () => {
    const response = await request(app)
      .get('/api/cars/available')
      .query({ startDate: '2025-05-05', endDate: '2025-05-01' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Start date must be before end date.',
    });
  });

  it('should return 500 if an error occurs', async () => {
    (carRepositoryInstance.findAll as jest.Mock).mockRejectedValue(
      new Error('Database error'),
    );

    const response = await request(app)
      .get('/api/cars/available')
      .query({ startDate: '2025-05-01', endDate: '2025-05-05' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Failed to fetch available cars.',
    });
  });
});
