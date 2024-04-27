import { createClient } from 'redis';
import configs from '../../../config/default';
import { logger } from '../../util/logger';

const client = createClient({
  password: configs.redis.password,
  socket: {
    host: configs.redis.url,
    port: Number(configs.redis.port),
  },
  legacyMode: true,
  disableOfflineQueue: true,
});

const redisOptions = {
  redis: {
    password: configs.redis.password,
    port: Number(configs.redis.port),
    host: configs.redis.url,
  },
};

export { client, redisOptions };
