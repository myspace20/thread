import knex from 'knex';
import { Model } from 'objection';
import config from '../infra/database/knexfile';
import PostRepository from './PostRepository';

describe('PostRepository', () => {
  beforeAll(() => {
    Model.knex(knex(config));
  });

  afterAll(() => {
    knex(config).destroy();
  });

  const id = '7e58106a-aee0-43a6-8fd2-c2f548319bb3';

  const postQuery = {
    id: '7e58106a-aee0-43a6-8fd2-c2f548319bb3',
    user_id: '5a912383-05f3-496f-964f-0c21a43cfb23',
  };

  const newPost = {
    thread_id: '06fa78e2-6148-4db9-b03e-d00b63d37143',
    user_id: 'ea54fcc9-6b58-46b1-bc16-2528698f637b',
    text: 'test post content',
  };

  const postUpdate = {
    text: 'test post content updated',
  };

  const postRepository = new PostRepository();

  describe('create post', () => {
    it('creates a new post', async () => {
      const post = await postRepository.create(newPost);
      expect(post).toBe(void 0);
    });
  });

  describe('retrieve post', () => {
    it('gets a post by id', async () => {
      const post = await postRepository.getById(id);
      expect(post.id).toBe(id);
    });

    it('gets a post by filter', async () => {
      const post = await postRepository.getByFilter(postQuery);
      expect(post.id).toBe(postQuery.id);
      expect(post.user_id).toBe(postQuery.user_id);
    });
  });

  describe('update post', () => {
    it('updates a post text', async () => {
      const post = await postRepository.patch(id, postUpdate);
      expect(post).toBe(void 0);
    });
  });
});
