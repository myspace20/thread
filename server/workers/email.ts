import Queue from 'bull';
import transport from '../../config/mail';
import { HttpError } from '../util/HttpError';
import { redisOptions } from '../../config/redis';

export const mailQueue = new Queue('email', redisOptions);

mailQueue.process('email', async (job, done) => {
  if (job.data) {
    transport.sendMail(job.data, (err: any) => {
      if (err) {
        throw new HttpError(500, 'error sending email');
      }
    });
    done();
  }
});
