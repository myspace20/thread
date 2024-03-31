import Redis from 'ioredis';
import configs from './default';
import { logger } from '../server/util/logger';

const client = new Redis({
  host: configs.redis.url,
  port: Number(configs.redis.port),
});

const redisOptions = {
  redis: {
    port: Number(configs.redis.port),
    host: configs.redis.url,
  },
};

client.connect();

client.on('error', (error) => {
  logger.error(`Redis client error:`, error);
});

export { client, redisOptions };
