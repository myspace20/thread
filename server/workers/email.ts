import Queue from 'bull';
import transport from '../infra/others/mail';
import { redisOptions } from '../infra/others/redis';

export const mailQueue = new Queue('email', redisOptions);

mailQueue.process('email', async (job, done) => {
  if (job.data) {
    transport.sendMail(job.data, (err: Error | null) => {
      if (err) {
        return;
      }
    });
    done();
  }
});

mailQueue.on('error', (err: any) => {
  console.log(err);
});
