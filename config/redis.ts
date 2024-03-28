import { createClient } from 'redis';
import configs from './default';

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

client.connect();

export { client, redisOptions };
