import app from './server/app';
import { env } from './config/env';
import { assertDatabaseConnectionOk, sequelize } from './db/sequelize';

async function start() {
  await assertDatabaseConnectionOk();

  app.listen(env.port, () => {
    console.log(`🚀 Server listening on port: ${env.port}`);
  });
}

start();
