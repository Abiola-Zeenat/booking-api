import { Sequelize } from 'sequelize-typescript';
import { env } from '../config/env';
import { Booking, Property } from '../models';

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: "postgres",
  logging: false,
  models: [Property, Booking], 
});

// Helper function to verify DB connectivity
export async function assertDatabaseConnectionOk() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection Successful');
  } catch (e: any) {
    console.error('❌ Unable to connect to the database:');
    console.error(e.message);
    process.exit(1);
  }
}

