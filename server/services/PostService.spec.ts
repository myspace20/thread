//@ts-nocheck
import sinon from 'sinon';
import PostRepositorty from '../repositories/PostRepository';
import PostService from '../services/PostService';
import { HttpError } from '../util/HttpError';
import { v4 } from 'uuid';

describe('PostService', () => {
  let postRepositoryStub;
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService();
    postRepositoryStub = sinon.stub(PostRepositorty.prototype);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('retrieve post', () => {
    it('get a post by id', async () => {
      const id = v4();
      const dummyPost = { id, text: 'post', user_id: id };
      postRepositoryStub.getById.resolves(dummyPost);
      const result = await postService.getById(id);
      expect(result).toEqual(dummyPost);
      expect(postRepositoryStub.getById.calledOnceWithExactly(id)).toEqual(
        true,
      );
      expect(postService).toBeInstanceOf(PostService);
    });

    it('get a post by id -- error', async () => {
      let error;
      postRepositoryStub.getById.throws(new HttpError(404, 'post not found'));
      try {
        await postService.getById('wrong id');
      } catch (e) {
        error = e;
      }
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('post not found');
    });
  });

  describe('create posts', () => {
    it('it creates a post', async () => {
      const id = v4();
      const dummyPost = { thread_id: id, text: 'post', user_id: id };
      postRepositoryStub.create.resolves({ ...dummyPost, id });
      const result = await postService.create(dummyPost);
      expect(result).toBeDefined();
      expect(result).toEqual({ ...dummyPost, id });
      expect(
        postRepositoryStub.create.calledOnceWithExactly(dummyPost),
      ).toEqual(true);
    });
  });

  describe('updates a post ', () => {
    it('updates a post as accepted', async () => {
      const id = v4();
      const dummyQuery = { thread_id: id, post_id: id, user_id: id };
      const returnValue = 'Post marked as accepted';
      postRepositoryStub.getByFilter.resolves({ ...dummyQuery, id });
      postRepositoryStub.patch.resolves(returnValue);
      const result = await postService.setPostAsAccepted(dummyQuery);
      expect(result).toBeDefined();
      expect(result).toEqual(returnValue);
      expect(
        postRepositoryStub.getByFilter.calledOnceWithExactly(dummyQuery),
      ).toEqual(true);
    });

    it('updates text of post', async () => {
      const id = v4();
      const dummyQuery = { thread_id: id, post_id: id, user_id: id };
      const returnValue = { text: 'updates' };
      postRepositoryStub.getByFilter.resolves({ ...dummyQuery, id });
      postRepositoryStub.patch.resolves(returnValue);
      const result = await postService.editPost(dummyQuery);
      expect(result).toBeDefined();
      expect(result).toEqual(returnValue);
      expect(
        postRepositoryStub.getByFilter.calledOnceWithExactly(dummyQuery),
      ).toEqual(true);
    });

    it('updates the text of post--error', async () => {
      let error;
      postRepositoryStub.getByFilter.throws(
        new HttpError(404, 'post not found'),
      );
      try {
        await postService.editPost('wrong data');
      } catch (e) {
        error = e;
      }
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('post not found');
    });
  });

  describe('remove a post', () => {
    it('removes a users post', async () => {
      const id = v4();
      const dummyQuery = { id, thread_id: id, user_id: id };
      const response = 'Post deleted successfully';
      postRepositoryStub.getByFilter.resolves(dummyQuery);
      postRepositoryStub.delete.resolves(response);
      const result = await postService.deletePost(dummyQuery);
      expect(result).toEqual(response);
      expect(
        postRepositoryStub.getByFilter.calledOnceWithExactly(dummyQuery),
      ).toEqual(true);
      expect(
        postRepositoryStub.delete.calledOnceWithExactly(dummyQuery.id),
      ).toEqual(true);
    });
  });
});
