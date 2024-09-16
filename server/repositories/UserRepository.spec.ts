import { faker } from '@faker-js/faker';
import UserRepository from './UserRepository';
import { Model } from 'objection';
import config from '../infra/database/knexfile';
import knex from 'knex';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
    Model.knex(knex(config));
  });

  afterAll(() => {
    knex(config).destroy();
  });

  const userId = 'ea54fcc9-6b58-46b1-bc16-2528698f637b';

  const email = 'John.Doe72@hotmail.com';

  const updates = {
    email: 'updated@midnight.com',
    display_name: 'fine_boy',
  };

  const newUser = {
    email: faker.internet.email({ firstName: 'John', lastName: 'Doe' }),
    display_name: faker.internet.displayName({
      firstName: 'John',
      lastName: 'Doe',
    }),
    password: faker.internet.password(),
  };

  describe.skip('create new user', () => {
    it('it creates a new user', async () => {
      const user = await userRepository.createNewUser(newUser);
      expect(user.email).toEqual(newUser.email);
      expect(user.display_name).toEqual(newUser.display_name);
      expect(user.password_hash).toEqual(newUser.password);
    });
  });

  describe('get user', () => {
    it('it gets a user by id', async () => {
      const user = await userRepository.getById(userId);
      expect(user.id).toBe(userId);
    });

    it('gets a user by email', async () => {
      const user = await userRepository.getByEmail(email);
      expect(user?.email).toBe(email);
    });
  });

  describe('update user', () => {
    it('updates user fiels', async () => {
      const user = await userRepository.patch(userId, updates);
      expect(user.id).toBe(userId);
      expect(user.email).toBe(updates.email);
      expect(user.display_name).toBe(updates.display_name);
    });
  });
});
