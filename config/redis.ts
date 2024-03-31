import { createClient } from 'redis';
import configs from './default';
import { logger } from '../server/util/logger';

const client = createClient({
  password: configs.redis.password,
  socket: {
    host: configs.redis.url,
    port: Number(configs.redis.port),
  },
  disableOfflineQueue: true,
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
