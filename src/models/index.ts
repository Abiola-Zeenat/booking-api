import { Sequelize } from "sequelize-typescript";
import { Property } from "./property";
import { Booking } from "./booking";
import { env } from "../config/env";


export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: "postgres",
  logging: false,
  models: [Property, Booking], // auto-load models with associations
})
// Ensure tables exist
export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection Successful");

    await sequelize.sync({ alter: true }); // or { force: true } in dev
    console.log("🗄  Database synchronized");
  } catch (err) {
    console.error("❌ Database init failed:", err);
    process.exit(1);
  }
};

export { Property, Booking };
