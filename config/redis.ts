import Redis from 'ioredis';
import configs from './default';
import { logger } from '../server/util/logger';

const client = new Redis({
  host: configs.redis.url,
  port: Number(configs.redis.port),
  enableOfflineQueue: false,
});

const redisOptions = {
  redis: {
    port: Number(configs.redis.port),
    host: configs.redis.url,
  },
};

client.on('error', (error) => {
  logger.error(`Redis client error:`, error);
});

export { client, redisOptions };
