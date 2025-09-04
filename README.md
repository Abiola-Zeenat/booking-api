# Booking API

A simple Booking API for a fictional property rental platform (similar
to Airbnb or Booking.com).  
Built with **Node.js**, **TypeScript**, **Express**, **PostgreSQL**, and
**Sequelize**.

------------------------------------------------------------------------

## Features

-   List all available properties with pagination and date filtering.
-   View a property's availability.
-   Create a booking for a property with validation:
    -   Dates must be within the property's availability range.
    -   Dates must not overlap with existing bookings.
    -   `start_date` must be before `end_date`.
-   Cancel (delete) a booking.

------------------------------------------------------------------------

## Tech Stack

-   **Node.js** + **TypeScript**
-   **Express.js** (API framework)
-   **PostgreSQL** (database)
-   **Sequelize** (ORM)
-   **Jest** / **Supertest** (for testing)

------------------------------------------------------------------------

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Abiola-Zeenat/booking-api.git
cd booking-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup PostgreSQL

Make sure PostgreSQL is installed and running.

Create a database (example: `booking_db`).

Update your `.env` file with database credentials:

```env
DATABASE_URL=postgres://username:password@localhost:5432/booking_db
PORT=5000
```

### 4. Run migrations

With Sequelize CLI:

```bash
npx sequelize-cli db:migrate
```

If you want to run seeders:

```bash
npx sequelize-cli db:seed:all
```

### 5. Start the server

```bash
npm run dev
```

API will be available at: `http://localhost:5000`

------------------------------------------------------------------------

## API Endpoints

### Properties

#### [GET] `/properties`

Returns a paginated list of all properties.

Query params:
- `page` (default: 1)
- `limit` (default: 10)
- `price` (optional) 
- `available_from` (optional) filter available properties by start date
- `available_to` (optional) filter available properties by end date

Example:

```http
GET /properties?page=1&limit=5&available_from=2025-09-10&available_to=2025-09-15
```

#### [GET] `/properties/:id/availability`

Returns available date ranges for a specific property.

------------------------------------------------------------------------

### Bookings

#### [POST] `/bookings`

Create a new booking.

Request body:

```json
{
  "property_id": 1,
  "user_name": "John Doe",
  "start_date": "2025-09-10",
  "end_date": "2025-09-15"
}
```

#### [DELETE] `/bookings/:id`

Cancel a booking by ID.

#### [PUT] `/bookings/:id`

update/change a booking details.
Request body:

```json
{
  "id": 1, //(required)
  "user_name": "John Doe",
  "start_date": "2025-09-10",
  "end_date": "2025-09-15"
}
```
------------------------------------------------------------------------

## Testing

Run unit and integration tests:

```bash
npm run test
```

------------------------------------------------------------------------

## Project Structure

```
src/
├── controllers/
│   └── propertyController.ts
├── services/
│   └── propertyService.ts
├── models/
│   ├── property.ts
│   └── booking.ts
├── routes/
│   ├── propertyRoutes.ts
│   └── bookingRoutes.ts
├── migrations/
├── seeders/
├── config/
│   └── config.js
├── app.ts
└── index.ts
```

------------------------------------------------------------------------

## Author

👤 Abiola Abdulsalam 
📧 azabdulsalam1@gmail.com

------------------------------------------------------------------------

### License

This project is licensed under the MIT License.

