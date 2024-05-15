import knex from 'knex';
import { Model } from 'objection';
import config from '../infra/database/knexfile';
import ThreadRepository from './ThreadRepository';

describe('ThreadRepository', () => {
  let threadRepository: ThreadRepository;

  beforeAll(() => {
    threadRepository = new ThreadRepository();

    Model.knex(knex(config));
  });

  afterAll(() => {
    knex(config).destroy();
  });

  const id = '2c7b7909-75fc-4c79-8652-29807c24fc3a';

  const user_id = 'ea54fcc9-6b58-46b1-bc16-2528698f637b';

  const updates = {
    title: 'Hello unit test thread updated',
    text: 'I hope this test passes, updates too',
  };

  const newThread = {
    user_id: 'ea54fcc9-6b58-46b1-bc16-2528698f637b',
    title: 'Hello unit test thread',
    text: 'I hope this test passes',
  };

  const tags = ['b460698d-dc2a-44f0-9817-2241e2dcea7d'];

  describe('create a thread', () => {
    it('creates a new thread', async () => {
      const thread = await threadRepository.create(tags, newThread);
      expect(thread).toBe('thread successfully created');
    });
  });

  describe('retrieve thread', () => {
    it('gets a thread by id', async () => {
      const thread = await threadRepository.getById(id);
      expect(thread.id).toBe(id);
    });

    it('gets a thread by a filter', async () => {
      const thread = await threadRepository.getByFilter({ id, user_id });
      expect(thread.user_id).toBe(user_id);
      expect(thread.id).toBe(id);
    });

    it('gets an array of threads', async () => {
      const thread = await threadRepository.get();
      expect(thread).toBeDefined();
    });
  });

  describe('patch or edit thread', () => {
    it('edits a thread', async () => {
      const thread = await threadRepository.patch(id, updates);
      expect(thread.title).toBe(updates.title);
      expect(thread.text).toBe(updates.text);
    });
  });
});
