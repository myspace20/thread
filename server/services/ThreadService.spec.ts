//@ts-nocheck
import sinon from 'sinon';
import ThreadRepository from '../repositories/ThreadRepository';
import ThreadService from './ThreadService';
import { v4 } from 'uuid';

describe('ThreadService', () => {
  let threadService: ThreadService;
  let threadRepositoryStub;

  beforeEach(() => {
    threadService = new ThreadService();
    threadRepositoryStub = sinon.stub(ThreadRepository.prototype);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('retrieve thread', () => {
    it('get by id', async () => {
      const id = v4();
      const dummyThread = { id, user_id: id, title: 'test', text: 'test' };
      threadRepositoryStub.getById.resolves(dummyThread);
      const result = await threadService.getById(id);
      expect(result).toEqual(dummyThread);
      expect(threadRepositoryStub.getById.calledOnceWithExactly(id)).toEqual(true);
      expect(threadService).toBeInstanceOf(ThreadService);
    });

    it('get all threads', async () => {
      const id = v4();
      const dummyThread = { id, user_id: id, title: 'test', text: 'test' };
      threadRepositoryStub.get.resolves([dummyThread]);
      const result = await threadService.getThreads(id);
      expect(result).toEqual([dummyThread]);
      expect(threadRepositoryStub.get.calledOnce).toEqual(true);
      expect(threadService).toBeInstanceOf(ThreadService);
    });
  });

  describe('create thread', () => {
    it('creates a thread', async () => {
      const id = v4();
      const dummyTags = [id, id];
      const response = "thread successfully created'";
      const threadInput = { user_id: id, title: 'test', text: 'test' };
      threadRepositoryStub.create.resolves(response);
      const result = await threadService.createThread(dummyTags, threadInput);
      expect(result).toEqual(response);
      expect(threadRepositoryStub.create.calledOnceWithExactly(dummyTags, threadInput)).toEqual(
        true,
      );
      expect(threadService).toBeInstanceOf(ThreadService);
    });
  });

  describe('edit thread', () => {
    const id = v4();
    const dummyQuery = { thread_id: id, post_id: id, user_id: id };
    const returnValue = { text: 'updates', title: 'updated' };
    threadRepositoryStub.getByFilter.resolves({ ...dummyQuery, id });
    threadRepositoryStub.patch.resolves(returnValue);
    const result = await threadService.editPost(dummyQuery);
    expect(result).toBeDefined();
    expect(result).toEqual(returnValue);
    expect(threadRepositoryStub.getByFilter.calledOnceWithExactly(dummyQuery)).toEqual(true);
  });
});
