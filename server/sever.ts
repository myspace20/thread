import app from './app';
import { Application } from 'express';
import * as dotenv from 'dotenv';
import { Model } from 'objection';
import config from './infra/database/knexfile';
import knex from 'knex';

const knexConfig = knex(config['development']);
Model.knex(knexConfig);

dotenv.config();

const startServer = async (app: Application) => {
  app.listen(8080, () => {
    console.log('8080 is live');
  });
};

startServer(app);
