import { createClient } from 'redis';
import configs from './default';
import { logger } from '../server/util/logger';

const client = createClient({
  url: configs.redis.url,
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
