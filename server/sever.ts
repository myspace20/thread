import app from './app';
import { Application } from 'express';
import * as dotenv from 'dotenv';
import { logger } from './util/logger';
import dbInstance from './infra/database/connect';
import { redisConnection, client } from '../config/redis';

dotenv.config();

const startServer = async (app: Application) => {
  app.listen(5000, () => {
    dbInstance;
    redisConnection();
    logger.info('server is up on 8080');
  });
};

startServer(app);
