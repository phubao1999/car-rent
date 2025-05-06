import request from 'supertest';
import app from '../src/app';
import { MESSAGES_ERROR, MESSAGES_ERROR_VALIDATED } from '../src/constant';
import { connectDBForUT, disconnectDB } from '../src/utils/db.util';
import {
  findAllMock,
  findOverlappingBookingsMock,
} from './__mocks__/repositories';

jest.mock('../src/models', () => ({
  Booking: { aggregate: jest.fn() },
  Car: {
    find: jest.fn().mockResolvedValue([]),
    insertMany: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Season: {
    find: jest.fn().mockResolvedValue([
      {
        name: 'Peak Season',
        code: 'peakSeasonPrice',
        periods: [
          {
            startDate: {
              $date: '2025-06-01T00:00:00.000Z',
            },
            endDate: {
              $date: '2025-09-15T00:00:00.000Z',
            },
          },
        ],
      },
      {
        name: 'Mid Season',
        code: 'midSeasonPrice',
        periods: [
          {
            startDate: {
              $date: '2025-03-01T00:00:00.000Z',
            },
            endDate: {
              $date: '2025-06-01T00:00:00.000Z',
            },
          },
          {
            startDate: {
              $date: '2025-09-15T00:00:00.000Z',
            },
            endDate: {
              $date: '2025-10-31T00:00:00.000Z',
            },
          },
        ],
      },
      {
        name: 'Off Season',
        code: 'offSeasonPrice',
        periods: [
          {
            startDate: {
              $date: '2025-11-01T00:00:00.000Z',
            },
            endDate: {
              $date: '2026-03-01T00:00:00.000Z',
            },
          },
        ],
      },
    ]),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
jest.mock('../src/repositories', () => require('./__mocks__/repositories'));

beforeAll(async () => {
  await connectDBForUT();
});

afterAll(async () => {
  await disconnectDB();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('GET Car Available', () => {
  it('should return a list of available cars with remaining stock and pricing', async () => {
    findOverlappingBookingsMock.mockResolvedValue([
      { _id: 'car123', bookingCount: 2 },
    ]);
    findAllMock.mockResolvedValue([
      {
        _id: 'car123',
        brand: 'Toyota',
        model: 'Corolla',
        stock: 5,
        offSeasonPrice: 100,
        midSeasonPrice: 110,
        peakSeasonPrice: 120,
        toObject: jest.fn().mockReturnValue({
          _id: 'car123',
          brand: 'Toyota',
          model: 'Corolla',
          stock: 5,
          offSeasonPrice: 100,
          midSeasonPrice: 110,
          peakSeasonPrice: 120,
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
        averagePrice: 100,
        brand: 'Toyota',
        midSeasonPrice: 110,
        model: 'Corolla',
        offSeasonPrice: 100,
        peakSeasonPrice: 120,
        remainingStock: 3,
        stock: 5,
        totalPrice: 500,
      }),
    ]);
  });
  it('should return 400 if startDate or endDate is missing', async () => {
    const response = await request(app).get('/api/cars/available').query({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: MESSAGES_ERROR_VALIDATED.AVAILABLE_CARS_PERIOD,
    });
  });
  it('should return 400 if startDate is after endDate', async () => {
    const response = await request(app)
      .get('/api/cars/available')
      .query({ startDate: '2025-05-05', endDate: '2025-05-01' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: MESSAGES_ERROR_VALIDATED.PERIOD_INVALID,
    });
  });

  it('should return 500 if an error occurs', async () => {
    findAllMock.mockRejectedValue(new Error('Database Error'));

    const response = await request(app)
      .get('/api/cars/available')
      .query({ startDate: '2025-05-01', endDate: '2025-05-05' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: MESSAGES_ERROR.GET_AVAILABLE_CARS,
    });
  });
});
