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

```bash
createdb booking_api
```

Or in `psql`:

```sql
CREATE DATABASE booking_api;
```

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

### 5. Seed sample data (optional)

Open `psql` or pgAdmin and insert sample properties:

```sql
INSERT INTO "Properties" (title, description, price_per_night, available_from, available_to, createdAt, updatedAt)
VALUES ('Cozy Apartment', 'Nice city center spot', 100, '2025-09-01', '2025-09-30', NOW(), NOW());
```

### 6. Start the server

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

#### [PUT] `/bookings`

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

## API Testing with Postman

You can test all API endpoints using the provided Postman collection.

### Import the Collection

1. Download the collection JSON file: [`postman_collection.json`](postman_collection.json)  
2. Open Postman and go to **File → Import → Upload Files**  
3. Select the downloaded JSON file to import all endpoints.

### Use the Hosted Link (Optional)

If you prefer, you can open the collection directly in Postman via this link:  
[Open in Postman](https://lively-satellite-526888.postman.co/workspace/zee's-workapace~67098a75-b56f-4b29-8aa2-d40da98b9c41/collection/42883657-c1298aa4-59d4-4ae6-a6cd-10bb090f0694?action=share&source=copy-link&creator=42883657)

### Environment Variables

Make sure to set the following variables in Postman:

| Variable       | Description                   | Example             |
|----------------|-------------------------------|-------------------|
| `BASE_URL`     | Base URL of the API           | `http://localhost:8080` |

> **Note:** Run your server locally (`npm run dev`) before sending requests.

------------------------------------------------------------------------

## Author

👤 Abiola Abdulsalam 
📧 azabdulsalam1@gmail.com

------------------------------------------------------------------------

### License

This project is licensed under the MIT License.

