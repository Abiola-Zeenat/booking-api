import { newDb } from "pg-mem";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Property, Booking } from "../../models";


let sequelize: Sequelize;

export const setupTestDb = async () => {
  const db = newDb({ autoCreateForeignKeyIndices: true });

  const pg = db.adapters.createPg();

  const options: SequelizeOptions = {
    dialect: "postgres",
    dialectModule: pg, 
    database: "test_db",
    username: "test_user",
    password: "test_pass",
    logging: false,
    models: [Property, Booking],
  };

  sequelize = new Sequelize(options);

  await sequelize.sync({ force: true });
  return sequelize;
};

export const resetDb = async () => {
  if (!sequelize) {
    throw new Error("Sequelize instance not initialized. Call setupTestDb first.");
  }
  await sequelize.sync({ force: true });
};

export const getSequelize = () => {
  if (!sequelize) {
    throw new Error("Sequelize instance not initialized. Call setupTestDb first.");
  }
  return sequelize;
};
