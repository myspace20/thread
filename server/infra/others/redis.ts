import { createClient } from 'redis';
import configs from '../../../config/default';

const redisClientInit = async () => {
  const client = createClient({
    // password: configs.redis.password,
    socket: {
      host: configs.redis.url,
      port: Number(configs.redis.port),
    },
    disableOfflineQueue: true,
  });

  await client.connect();

  return client;
};

const redisOptions = {
  redis: {
    password: configs.redis.password,
    port: Number(configs.redis.port),
    host: configs.redis.url,
  },
};

export { redisOptions };
export default redisClientInit;
