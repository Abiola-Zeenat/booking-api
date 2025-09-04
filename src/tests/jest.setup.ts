import 'dotenv/config';

process.env.NODE_ENV = 'test';

// If you used config/config.js with TEST_DB_NAME support, this will
// make sequelize point to a separate test DB automatically.
if (!process.env.TEST_DB_NAME) {
  const base = process.env.DB_NAME || 'booking_api';
  process.env.TEST_DB_NAME = `${base}_test`;
}

// Optional: if your env.ts reads DB_NAME directly (not TEST_DB_NAME),
// you can force DB_NAME to the test one here:
process.env.DB_NAME = process.env.TEST_DB_NAME;
