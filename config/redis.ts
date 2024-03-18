import { createClient } from 'redis';
import configs from './default';

const client = createClient({
  socket: {
    host: configs.redis.url,
    port: Number(configs.redis.port),
  },
});

client.connect();

export default client;
