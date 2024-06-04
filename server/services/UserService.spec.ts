//@ts-nocheck
import sinon from 'sinon';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';
import HashService from './HashService';
import Queue from 'bull';
import redisMock from 'redis-mock';

describe('UserService', () => {
  let hashServiceStub;
  let userRepositoryStub;
  let userService: UserService;
  let mailQueueStub;
  let redisClient;
  let userRepository;
  let mailQueue;
  let hashService;

  beforeEach(() => {
    userRepositoryStub = sinon.stub(UserRepository.prototype);
    hashServiceStub = sinon.stub(HashService.prototype);
    mailQueueStub = sinon.stub(Queue.prototype);
    userService = new UserService();
    redisClient = redisMock.createClient();
    userRepository = new UserRepository();
    hashService = new HashService();
    mailQueue = new Queue('email');
  });

  afterEach((done) => {
    redisClient.flushall(done);
    sinon.restore();
  });

  describe('creates a new user', () => {
    it('it sends a verification email to a potential user', async () => {
      const userNotFound = 'not found';
      const hashValue = 'hash';
      const emailSent = 'delivered';

      userRepositoryStub.getByEmail.resolves(userNotFound);
      hashServiceStub.createHash.resolves(hashValue);
      mailQueueStub.add.resolves(emailSent);

      const user = await userRepository.getByEmail('email');

      const hash = await hashService.createHash('password');

      const email = await mailQueue.add('email', 'user');

      expect(user).toBe(userNotFound);
      expect(hash).toBe(hashValue);
      expect(email).toBe(emailSent);
    });
  });

  describe('redis interactions', () => {
    it('stores and retrieves a data from redis', (done) => {
      redisClient.set('registrationId', 'user', () => {
        redisClient.get('registrationId', (err, redisValue) => {
          expect(redisValue).toBe('user');
          done();
        });
      });
    });

    it('stores and removes data from redis', (done) => {
      redisClient.set('registrationId', 'user', () => {
        redisClient.del('registrationId', (err, redisValue) => {
          expect(redisValue).toBe(1);
          done();
        });
      });
    });
  });
  //will not write test for the rest of the methods of the class because of the limitations
  //of the redis mock package, the test for redis components will be separated
});
