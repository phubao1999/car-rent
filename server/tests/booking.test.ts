import request from 'supertest';
import { connectDBForUT, disconnectDB } from '../src/utils/db.util';
import app from '../src/app';
import {
  findByIdMock,
  countOverlappingBookingsMock,
  createMock,
} from './__mocks__/repositories';

jest.mock('../src/models', () => ({
  Booking: {
    save: jest.fn(),
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

describe('POST Booking', () => {
  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/api/cars/book').send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'All fields are required.' });
  });
  it('should return 400 if start date bigger then end date', async () => {
    const response = await request(app).post('/api/cars/book').send({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      drivingLicenseExpiry: '2026-01-01',
      carId: 'car123',
      startDate: '2025-05-04',
      endDate: '2025-05-01',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Start date must be before end date.',
    });
  });
  it('should return 400 if driving license expire before booking date', async () => {
    const response = await request(app).post('/api/cars/book').send({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      drivingLicenseExpiry: '2025-01-01',
      carId: 'car123',
      startDate: '2025-05-01',
      endDate: '2025-05-05',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Driving license must be valid through the booking period.',
    });
  });
  it('should return 404 if can not find a car', async () => {
    findByIdMock.mockResolvedValue(null);
    const response = await request(app).post('/api/cars/book').send({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      drivingLicenseExpiry: '2030-01-01',
      carId: 'car123',
      startDate: '2025-05-01',
      endDate: '2025-05-05',
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Car not found.',
    });
  });
  it('should return 400 if remaining car is 0', async () => {
    findByIdMock.mockResolvedValue({
      carId: 'car123',
      brand: 'Mercedes',
      model: 'Vito',
      stock: 2,
      offSeasonPrice: 100,
      midSeasonPrice: 110,
      peakSeasonPrice: 120,
    });
    countOverlappingBookingsMock.mockResolvedValue(2);
    const response = await request(app).post('/api/cars/book').send({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      drivingLicenseExpiry: '2030-01-01',
      carId: 'car123',
      startDate: '2025-05-01',
      endDate: '2025-05-05',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'This car is fully booked for the selected dates.',
    });
  });
  it('should return 500 if an error occurs', async () => {
    findByIdMock.mockRejectedValue(new Error('Database Error'));
    const response = await request(app).post('/api/cars/book').send({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      drivingLicenseExpiry: '2030-01-01',
      carId: 'car123',
      startDate: '2025-05-01',
      endDate: '2025-05-05',
    });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Failed to create booking.',
    });
  });
  it('should return a booking after booking request successfully', async () => {
    findByIdMock.mockResolvedValue({
      carId: 'car123',
      brand: 'Mercedes',
      model: 'Vito',
      stock: 2,
      offSeasonPrice: 100,
      midSeasonPrice: 110,
      peakSeasonPrice: 120,
    });
    countOverlappingBookingsMock.mockResolvedValue(1);
    createMock.mockResolvedValue({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      drivingLicenseExpiry: '2030-01-01',
      carId: 'car123',
      startDate: '2025-05-01',
      endDate: '2025-05-05',
    });
    const mockData = {
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      drivingLicenseExpiry: '2030-01-01',
      carId: 'car123',
      startDate: '2025-05-01',
      endDate: '2025-05-05',
    };
    const response = await request(app).post('/api/cars/book').send(mockData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Booking created successfully.',
        booking: mockData,
      }),
    );
  });
});
