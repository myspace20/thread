import knex from 'knex';
import { Model } from 'objection';
import config from '../infra/database/knexfile';
import CommentRepository from './CommentRepository';

describe('CommentRepository', () => {
  let commmentRepository: CommentRepository;

  beforeAll(() => {
    commmentRepository = new CommentRepository();
    Model.knex(knex(config));
  });

  afterAll(() => {
    knex(config).destroy();
  });

  const user_id = '5a912383-05f3-496f-964f-0c21a43cfb23';

  const id = '071ca41b-1cfd-49c6-99ec-d241823219cf';

  const commentText = {
    text: 'Updated comment',
  };

  const postCommentFilter = {
    id: '28bd4e70-a3e4-4b8f-b329-619adecf0904',
    user_id: '5a912383-05f3-496f-964f-0c21a43cfb23',
    post_id: '7e58106a-aee0-43a6-8fd2-c2f548319bb3',
  };

  const threadCommentFilter = {
    id: '071ca41b-1cfd-49c6-99ec-d241823219cf',
    user_id: '5a912383-05f3-496f-964f-0c21a43cfb23',
    thread_id: 'bec7cc26-9c10-4f59-b1c9-f170c6acd4a8',
  };

  const newPostComment = {
    text: 'A post comment',
    user_id: '5a912383-05f3-496f-964f-0c21a43cfb23',
    post_id: '7e58106a-aee0-43a6-8fd2-c2f548319bb3',
  };

  const newThreadComment = {
    text: 'A thread comment',
    user_id: '5a912383-05f3-496f-964f-0c21a43cfb23',
    thread_id: '2c7b7909-75fc-4c79-8652-29807c24fc3a',
  };

  describe('create comment', () => {
    it('creates a post comment', async () => {
      const comment = await commmentRepository.createComment(newPostComment);
      expect(comment.text).toBe(newPostComment.text);
      expect(comment.post_id).toBe(newPostComment.post_id);
      expect(comment.user_id).toBe(newPostComment.user_id);
    });

    it('creates a thread comment', async () => {
      const comment = await commmentRepository.createComment(newThreadComment);
      expect(comment.text).toBe(newThreadComment.text);
      expect(comment.thread_id).toBe(newThreadComment.thread_id);
      expect(comment.user_id).toBe(newThreadComment.user_id);
    });
  });

  describe('retrieve comment', () => {
    it('retrieves a comment by id', async () => {
      const comment = await commmentRepository.getById(id);
      expect(comment.id).toBe(id);
    });

    it('retrieves a post comment by filter', async () => {
      const comment = await commmentRepository.getByFilter(postCommentFilter);
      expect(comment.user_id).toBe(postCommentFilter.user_id);
      expect(comment.id).toBe(postCommentFilter.id);
      expect(comment.post_id).toBe(postCommentFilter.post_id);
    });

    it('retrieves a thread comment by filter', async () => {
      const comment = await commmentRepository.getByFilter(threadCommentFilter);
      expect(comment.id).toBe(threadCommentFilter.id);
      expect(comment.user_id).toBe(threadCommentFilter.user_id);
      expect(comment.thread_id).toBe(threadCommentFilter.thread_id);
    });
  });

  describe('update a comment', () => {
    it('updates a comment by id', async () => {
      const comment = await commmentRepository.editComment(id, commentText);
      expect(comment.id).toBe(id);
      expect(comment.text).toBe(commentText.text);
    });
  });
});
