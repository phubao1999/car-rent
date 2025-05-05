# Car Rental App

A **Car Rental Application** built with
**Angular** as the FrontEnd side.
**Node.js**, **Express**. as the BackEnd side.
**MongoDB Atlas** for Database.
This app is written by **Typescript** and follows **SOLID principles**, **Hexagonal Architecture**, **Repository Pattern** and incorporates **Design Patterns** for maintainability and scalability.

---

## Features

- **Car Availability**: Check available cars for a given date range.
- **Booking Management**: Create bookings for available cars.
- **Pricing Calculation**: Calculate total and average pricing for bookings.
- **Database Integration**: MongoDB for data persistence.
- **Test Coverage**: Unit tests with Jest.

## SOLID principles, Hexagonal Architecture, Repository Pattern and incorporates Design Patterns

The `createBooking` function is responsible for handling booking creation. It integrates the following principles:

- **SOLID Principles**:

  - **Single Responsibility Principle (SRP)**: The `createBooking` function in the controller only handles HTTP request validation and response formatting. The actual booking logic is delegated to the `BookingService`.
  - **Dependency Inversion Principle (DIP)**: The `BookingService` depends on an abstraction (`BookingRepository`) rather than a concrete implementation, making it easier to swap out the data source.

- **Hexagonal Architecture**:

  - The `BookingService` contains the core business logic for creating bookings, while the `BookingRepository` handles data persistence. This ensures that the business logic is independent of the database.

- **Repository Pattern**:

  - The `BookingRepository` abstracts the database operations (e.g., creating a booking), allowing the service layer to remain agnostic of the underlying data source.

- **Design Patterns**:
  - **Dependency Injection**: The `BookingService` receives the `BookingRepository` as a dependency, making it easier to mock during testing.

The `getAvailableCars` function is responsible for fetching available cars based on a date range. It integrates the following principles:

- **SOLID Principles**:

  - **Single Responsibility Principle (SRP)**: The `getAvailableCars` function in the controller only validates the request and formats the response. The business logic for fetching available cars is handled by the `CarService`.
  - **Open/Closed Principle (OCP)**: The `CarService` is open for extension (e.g., adding new pricing rules) but closed for modification, as the logic is encapsulated in reusable methods.
  - **Dependency Inversion Principle (DIP)**: The `CarService` depends on abstractions (`CarRepository` and `BookingRepository`) rather than concrete implementations.

- **Hexagonal Architecture**:

  - The `CarService` contains the core business logic for calculating available cars and pricing. It interacts with the `CarRepository` and `BookingRepository` to fetch data, ensuring the business logic is decoupled from the database.

- **Repository Pattern**:

  - The `CarRepository` abstracts the database operations for fetching car data, while the `BookingRepository` handles booking-related queries. This separation makes the code more modular and testable.

- **Design Patterns**:
  - **Dependency Injection**: The `CarService` receives `CarRepository` and `BookingRepository` as dependencies, making it easier to test and mock.
  - **Factory Pattern**: The `CarService` uses helper functions like `calculateTotalPrice` to encapsulate pricing logic, which can be extended or replaced without modifying the service.

## Extra Features

- **Admin Management**:
- Go to /admin in browser (Username and Password store in .env file, you can create your own or I will send it.)
- [Booking History] allow admin can watch booking history for management
- [Dashboard] Admin can edit information of config of application such as: List of Cars, Seasons Price
- **Coupon for Booking**:
- When booking a car, user can attach coupon code to have a discount payment for a booking request. In future, if I have time, I will store voucher in DB and can be management in Admin page, but for now, I had hardcode it in environment.ts file in Client

## Note:

- Because I don't have much time for this application. So i just add authentication for admin site only. Any other user will be define as anonymous user. It mean that user can book a car without register, just submit a information form and payment form (Payment form just a sample form) and can book a car
- There maybe causing a few bugs in application because not much time for testing, but I want to focus to the main function which is: "Create Booking" and "Get Available Cars in Period". So please forgive me if you see some things bad on this test.

## Things to improve:

- Make Base Request and Base Response for easier to handle incoming request and handle response in communicate between FE and BE.
- Better validate input, request, token,... strategies even create some directives in FE for better UX. I'm not focus on this part, but if I have a chance, I will.
- More Unit Test to coverage application.
- For now, in client (FE), Almost component is standalone. Because of that, when building FE application causing high amount of bundle (1.28Mb). Need to re-architect module and reduce of standalone components to reduce bundle size

---

## Table of Contents

- [Getting Started](#getting-started)
- [Testing](#testing)

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MongoDB** (local or cloud instance)
- **Docker Engine** (Optional)

### Run By Docker (Optional)

go to the root folder and run "docker-compose up -d"
then open browser and access http://localhost

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/phubao1999/car-rent.git
   ```
2. Start Client (FE)
   ```
   cd ./client
   npm start
   ```
3. Start Server (BE)

   ```
   cd ./server
   npm start
   ```

   For Database, I have already create an instance in https://cloud.mongodb.com/. But if you want your own DB, you can create one.
   For Env file, The content will be look like this:
   PORT=yourPort
   NODE_ENV=development || Production || Whatever environment
   MONGO_URI=connectURI
   ADMIN_EMAIL=yourmail@gmail.com
   ADMIN_PASSWORD=yourPassword
   JWT_SECRECT=yourSecret

4. Access the app:
   Frontend: http://localhost:4200
   Backend: http://localhost:3000

---

## Testing

Once again, I don't have much time, so just write test only for server and just cover 2 main function of this application is
[Get Available Cars]
[Booking a Car]

To run test:

1. cd to ./server
2. Run all Tests:
   `npm test`
   Run a specific tests:
   `npm test -t "should return 400 if startDate or endDate is missing"`

---
