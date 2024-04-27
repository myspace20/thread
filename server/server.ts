import app from './app';
import { Application } from 'express';
import * as dotenv from 'dotenv';
import { logger } from './util/logger';
import dbInstance from './infra/database/connect';
import config from '../config/default';
import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, '../.env'), override: true });

const startServer = async (app: Application) => {
  app.listen(config.port, config.host, () => {
    dbInstance;
    logger.info(`Sever is running on port ${config.port}`);
  });
};

process.on('SIGTERM', (e) => {
  logger.warn(e);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  logger.warn(e);
  process.exit(1);
});

process.on('uncaughtException', (e) => {
  logger.warn(e);
  process.exit(1);
});

startServer(app);
