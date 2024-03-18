import Queue from 'bull';
import configs from './default';
import transport from './mail';
import { HttpError } from '../server/util/HttpError';

// function createQueue(name: string) {
//     return new Queue(name, {
//         redis: { port: Number(configs.redis.port), host: configs.redis.url},
//     });
// }

export const redisOptions = {
  redis: { port: Number(configs.redis.port), host: configs.redis.url },
};

export const mailQueue = new Queue('email', redisOptions);

mailQueue.process('email', async (job, done) => {
  if (job.data) {
    transport.sendMail(job.data, (err) => {
      throw new HttpError(500, 'error sending email');
    });
    done();
  }
});

// export default createQueue;
