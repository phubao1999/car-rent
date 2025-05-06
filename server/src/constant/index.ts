export const MESSAGES = {
  APP_LISTEN: 'Server running on port:',
  LOGOUT_SUCCESS: 'Logged out successfully',
  UPDATED_SEASON: 'Seasons updated successfully.',
  BOOKING_CREATED: 'Booking created successfully.',
  DB_CONNECTED: 'MongoDB connected successfully',
  DB_DISCONNECTED: 'MongoDB disconnected successfully',
};

export const MESSAGES_ERROR = {
  SEASONS: 'Failed to fetch seasons',
  UPDATE_SEASONS: 'Failed to update seasons.',
  GET_CARS: 'Failed to fetch cars',
  UPDATE_CAR: 'Failed to update cars',
  BOOKING: 'Failed to fetch bookings',
  LOGIN_INVALID: 'Invalid email or password',
  BOOKING_FAILED: 'Failed to create booking.',
  GET_AVAILABLE_CARS: 'Failed to fetch available cars.',
  SERVER_ERROR: 'Internal Server Error',
  USER_NOT_FOUND: 'User not found',
  JWT_INVALID: 'Not authorized, token failed',
  UNAUTHORIZED: 'Access denied, admin only',
  CAR_NOT_FOUND: 'Car not found.',
  OVER_LAPPING_BOOKING: 'This car is fully booked for the selected dates.',
};

export const MESSAGES_ERROR_VALIDATED = {
  SEASONS_PAYLOAD:
    'Invalid request payload. "seasons" must be a non-empty array.',
  SEASONS_TYPE:
    'Each season must have a name, at least one valid period, and valid startDate and endDate.',
  CARS_PAYLOAD: 'Invalid data format. Expected an array of cars.',
  BOOKING_PAYLOAD: 'All fields are required.',
  AVAILABLE_CARS_PERIOD: 'Start date and end date are required.',
  PERIOD_INVALID: 'Start date must be before end date.',
  DB_CONNECTION: 'MONGO_URI is not defined in the environment variables',
  TOKEN_REQUIRED: 'Not authorized, no token',
  BOOKING_LICENSE_EXPIRY:
    'Driving license must be valid through the booking period.',
};

export const MESSAGES_INFO = {
  ADMIN_CREATED: 'Admin user already exists',
  SEASONS_CREATED: 'Seasons already exist in the database.',
  CARS_CREATED: 'Cars already exist in the database.',
  SEASONS_INIT:
    'No seasons found in the database. Initializing default seasons...',
  SEASON_INIT_DONE: 'Default seasons have been initialized.',
  CARS_INIT: 'No cars found in the database. Initializing default cars...',
  CARS_INIT_DONE: 'Default cars have been initialized.',
};
