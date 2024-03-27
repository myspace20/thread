import { RedisClientType, createClient } from 'redis';
import configs from './default';
import { logger } from '../server/util/logger';

const client = createClient({
  socket: {
    host: configs.redis.url,
    port: Number(configs.redis.port),
  },
});

const redisOptions = {
  redis: {
    port: Number(configs.redis.port),
    host: configs.redis.url,
  },
};

async function redisConnection() {
  try {
    await client.connect();
  } catch (err) {
    logger.error(err);
  }
}

export { redisConnection, client, redisOptions };
