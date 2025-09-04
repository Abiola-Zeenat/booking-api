import app from './server/app';
import { env } from './config/env';
import { assertDatabaseConnectionOk, sequelize } from './db/sequelize';
import './models'; 
import "reflect-metadata";
import { initDb } from './models';



async function start() {
  await assertDatabaseConnectionOk();
  await initDb();

  app.listen(env.port, () => {
    console.log(`🚀 Server listening on port: ${env.port}`);
  });
}

start();
