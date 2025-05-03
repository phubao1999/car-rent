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

## Extra Features

- **Admin Management**:
- Go to /admin in browser (Username and Password store in .env file, you can create your own or I will send it.)
- [Booking History] allow admin can watch booking history for management
- [Dashboard] Admin can edit information of config of application such as: List of Cars, Seasons Price
- **Coupon for Booking**:
- When booking a car, user can attach coupon code to have a discount payment for a booking request. In future, if I have time, I will store voucher in DB and can be management in Admin page, but for now, I had hardcode it in environment.ts file in Client

## Note:

- Because I don't have much time for this application. So i just add authentication for admin site only. Any other user will be define as anonymous user. It mean that user can book a car without register, just submit a information form and payment form (Payment form just a sample form) and can book a car

## Things to improve:

- Make Base Request and Base Response for easier to handle incoming request and handle response in communicate between FE and BE.
- More Unit Test to coverage application.
- For now, in client (FE), Almost component is standalone. Because of that, when building FE application causing high amount of bundle (1.28Mb). Need to re-architect module and reduce of standalone components to reduce bundle size

---

## Table of Contents

- [Getting Started](#getting-started)
- [Testing](#testing)
- [Project Structure](#project-structure)

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MongoDB** (local or cloud instance)
- **Docker Engine** (Optional)

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

4. Access the app:
   Frontend: http://localhost:4200
   Backend: http://localhost:3000

### Run By Docker (Optional)

go to the root folder and run "docker-compose up -d"
then open browser and access http://localhost

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

## Project Structure

### FrontEnd

```
└── 📁client
    └── 📁public
        └── favicon.ico
    └── 📁src
        └── 📁app
            └── app-routing.module.ts
            └── app.component.html
            └── app.component.scss
            └── app.component.spec.ts
            └── app.component.ts
            └── app.config.ts
            └── 📁core
                └── 📁auth # Handle Authentication and Authorization
                    └── admin.guard.spec.ts
                    └── admin.guard.ts
                    └── booking.guard.spec.ts
                    └── booking.guard.ts
                └── 📁components # Core Components
                    └── 📁admin-header
                        └── admin-header.component.html
                        └── admin-header.component.scss
                        └── admin-header.component.spec.ts
                        └── admin-header.component.ts
                    └── 📁footer
                        └── footer.component.html
                        └── footer.component.scss
                        └── footer.component.spec.ts
                        └── footer.component.ts
                    └── 📁loading
                        └── loading.component.html
                        └── loading.component.scss
                        └── loading.component.spec.ts
                        └── loading.component.ts
                    └── 📁main-header
                        └── main-header.component.html
                        └── main-header.component.scss
                        └── main-header.component.spec.ts
                        └── main-header.component.ts
                └── 📁directives
                └── 📁interceptors # Interceptors
                    └── error.interceptor.spec.ts
                    └── error.interceptor.ts
                    └── token.interceptor.spec.ts
                    └── token.interceptor.ts
                └── 📁models # Models for FE
                    └── admin.interface.ts
                    └── booking.interface.ts
                    └── car.interface.ts
                    └── index.ts
                    └── seasons.interface.ts
                └── 📁services # Core Services
                    └── core.service.spec.ts
                    └── core.service.ts
                └── 📁templates
                    └── 📁admin-layout
                        └── admin-layout.component.html
                        └── admin-layout.component.scss
                        └── admin-layout.component.spec.ts
                        └── admin-layout.component.ts
            └── 📁pages # Pages Components
                └── 📁admin-dashboard
                    └── admin-dashboard.component.html
                    └── admin-dashboard.component.scss
                    └── admin-dashboard.component.spec.ts
                    └── admin-dashboard.component.ts
                    └── admin.service.spec.ts
                    └── admin.service.ts
                    └── 📁components
                        └── 📁cars-management
                            └── cars-management.component.html
                            └── cars-management.component.scss
                            └── cars-management.component.spec.ts
                            └── cars-management.component.ts
                        └── 📁seasons-management
                            └── seasons-management.component.html
                            └── seasons-management.component.scss
                            └── seasons-management.component.spec.ts
                            └── seasons-management.component.ts
                └── 📁admin-history
                    └── admin-history.component.html
                    └── admin-history.component.scss
                    └── admin-history.component.spec.ts
                    └── admin-history.component.ts
                └── 📁admin-login
                    └── admin-auth.service.spec.ts
                    └── admin-auth.service.ts
                    └── admin-login.component.html
                    └── admin-login.component.scss
                    └── admin-login.component.spec.ts
                    └── admin-login.component.ts
                └── 📁booking
                    └── booking.component.html
                    └── booking.component.scss
                    └── booking.component.spec.ts
                    └── booking.component.ts
                └── 📁home
                    └── home.component.html
                    └── home.component.scss
                    └── home.component.spec.ts
                    └── home.component.ts
            └── 📁utils # Utils Function
                └── utility.service.spec.ts
                └── utility.service.ts
        └── 📁environments
            └── environment.prod.ts
            └── environment.ts
        └── index.html
        └── main.ts
        └── styles.scss
    └── .dockerignore
    └── .editorconfig
    └── .gitignore
    └── angular.json
    └── Dockerfile
    └── nginx.conf
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.spec.json
```

### Backend

```
└── 📁server
    └── 📁logs # Logging File
        └── combined.log
        └── error.log
    └── 📁src
        └── app.ts
        └── 📁config # Config Application
            └── env.config.ts
            └── index.ts
        └── 📁controllers # Controller of Application
            └── adminController.ts
            └── carController.ts
            └── index.ts
            └── userController.ts
        └── 📁db # Database of Application
            └── db.ts
            └── index.ts
        └── 📁middlewares # Middlewares
            └── authHandler.ts
            └── errorHandler.ts
            └── index.ts
        └── 📁models # Models
            └── index.ts
            └── 📁interface
                └── booking.interface.ts
                └── car.interface.ts
                └── season.interface.ts
                └── user.interface.ts
            └── 📁schema
                └── booking.schema.ts
                └── car.schema.ts
                └── season.schema.ts
                └── user.schema.ts
        └── 📁repositories # DB Repositories
            └── booking.repository.ts
            └── car.repository.ts
            └── index.ts
        └── 📁routes # App Router
            └── adminRouter.ts
            └── carRouter.ts
            └── index.ts
            └── userRouter.ts
        └── server.ts # Application index
        └── 📁services # Service / Business Logic
            └── booking.service.ts
            └── car.service.ts
            └── index.ts
        └── 📁utils # Utils Function
            └── db.util.ts
            └── helper.ts
            └── logger.util.ts
    └── 📁tests # Testing
        └── cars.test.ts
    └── .dockerignore
    └── .env
    └── .gitignore
    └── .prettierrc
    └── Dockerfile
    └── eslint.config.js
    └── jest.config.js
    └── nodemon.json
    └── package-lock.json
    └── package.json
    └── tsconfig.json
```
