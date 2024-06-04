//@ts-nocheck
import sinon from 'sinon';
import CommentService from './CommentService';
import CommentRepository from '../repositories/CommentRepository';
import ThreadRepository from '../repositories/ThreadRepository';
import PostRepository from '../repositories/PostRepository';
import { v4 } from 'uuid';
import { HttpError } from '../util/HttpError';

describe('CommentService', () => {
  let commentRepositoryStub;
  let threadRepositoryStub;
  let postRepositoryStub;
  let commentService: CommentService;

  beforeEach(() => {
    commentService = new CommentService();
    commentRepositoryStub = sinon.stub(CommentRepository.prototype);
    threadRepositoryStub = sinon.stub(ThreadRepository.prototype);
    postRepositoryStub = sinon.stub(PostRepository.prototype);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('retrieve comment', () => {
    it('get comment by id', async () => {
      const id = v4();
      const dummyComment = { id, text: 'test', post_id: id, user_id: id };
      commentRepositoryStub.getById.resolves(dummyComment);
      const result = await commentService.getCommentById(id);
      expect(result).toBe(dummyComment);
      expect(commentRepositoryStub.getById.calledOnceWithExactly(id)).toEqual(
        true,
      );
    });

    it('get comment by id -- error', async () => {
      let error;
      commentRepositoryStub.getById.throws(
        new HttpError(404, 'comment not found'),
      );
      try {
        await commentService.getCommentById('wrong_id');
      } catch (e) {
        error = e;
      }
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('comment not found');
    });
  });

  describe('create comments', () => {
    it('creates a comment for a thread', async () => {
      const id = v4();
      const dummyComment = { text: 'test', thread_id: id, user_id: id };
      const dummyThread = { id, text: 'thread', user_id: id };
      threadRepositoryStub.getById.resolves(dummyThread);
      commentRepositoryStub.createComment.resolves(dummyComment);
      const result = await commentService.addThreadComment(dummyComment);
      expect(result).toEqual(dummyComment);
      expect(
        threadRepositoryStub.getById.calledOnceWithExactly(
          dummyComment.thread_id,
        ),
      ).toEqual(true);
      expect(
        commentRepositoryStub.createComment.calledOnceWithExactly(dummyComment),
      ).toEqual(true);
    });

    it('creates a comment for a post', async () => {
      const id = v4();
      const dummyComment = { text: 'test', post_id: id, user_id: id };
      const dummyPost = { id, text: 'post', user_id: id };
      postRepositoryStub.getById.resolves(dummyPost);
      commentRepositoryStub.createComment.resolves(dummyComment);
      const result = await commentService.addPostComment(dummyComment);
      expect(result).toEqual(dummyComment);
      expect(
        postRepositoryStub.getById.calledOnceWithExactly(dummyComment.post_id),
      ).toEqual(true);
      expect(
        commentRepositoryStub.createComment.calledOnceWithExactly(dummyComment),
      ).toEqual(true);
    });

    //using the post for this example to avoid duplication
    it('create a comment --error', async () => {
      let error;
      postRepositoryStub.getById.throws(new HttpError(404, 'post not found'));

      try {
        await commentService.addPostComment('wrong data');
      } catch (e) {
        error = e;
      }
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('post not found');
    });
  });

  describe('edit comment', () => {
    it('updates the text field of a comment', async () => {
      const id = v4();
      const dummyQuery = { post_id: id, user_id: id };
      const dummyComment = {
        id,
        post_id: id,
        user_id: id,
        text: 'to be updated',
      };
      const updatedTextResult = {
        id,
        post_id: id,
        user_id: id,
        text: 'updated',
      };
      const updatedTextData = { text: 'updated' };
      commentRepositoryStub.getByFilter.resolves(dummyComment);
      commentRepositoryStub.editComment.resolves(updatedTextResult);
      const result = await commentService.editPostComment(
        dummyQuery,
        updatedTextData,
      );
      expect(result).toEqual(updatedTextResult);
      expect(
        commentRepositoryStub.getByFilter.calledOnceWithExactly(dummyQuery),
      ).toEqual(true);
      expect(
        commentRepositoryStub.editComment.calledOnceWithExactly(
          dummyComment.id,
          updatedTextData,
        ),
      ).toEqual(true);
      expect(commentService).toBeInstanceOf(CommentService);
    });

    it('updates the text field of a comment -- error', async () => {
      let error;
      commentRepositoryStub.getByFilter.throws(
        new HttpError(404, 'post not found'),
      );
      try {
        await commentService.editPostComment('wrong data');
      } catch (e) {
        error = e;
      }
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('post not found');
    });
  });

  describe('remove comment', () => {
    it('removes a users comment', async () => {
      const id = v4();
      const dummyQuery = { id, post_id: id, user_id: id };
      const response = 'comment deleted successfully';
      commentRepositoryStub.getByFilter.resolves(dummyQuery);
      commentRepositoryStub.deleteComment.resolves(response);
      const result = await commentService.deletePostComment(dummyQuery);
      expect(result).toEqual(response);
      expect(
        commentRepositoryStub.getByFilter.calledOnceWithExactly(dummyQuery),
      ).toEqual(true);
      expect(
        commentRepositoryStub.deleteComment.calledOnceWithExactly(
          dummyQuery.id,
        ),
      ).toEqual(true);
    });
  });
});
