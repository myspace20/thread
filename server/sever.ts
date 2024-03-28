import app from './app';
import { Application } from 'express';
import * as dotenv from 'dotenv';
import { logger } from './util/logger';
import dbInstance from './infra/database/connect';

dotenv.config();

const startServer = async (app: Application) => {
  app.listen(5000, () => {
    dbInstance;
    logger.info('server is up on 5000');
  });
};

startServer(app);
