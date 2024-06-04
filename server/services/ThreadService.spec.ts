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
      expect(threadRepositoryStub.getById.calledOnceWithExactly(id)).toEqual(
        true,
      );
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
      const response = 'thread successfully created';
      const threadInput = { user_id: id, title: 'test', text: 'test' };
      threadRepositoryStub.create.resolves(response);
      const result = await threadService.createThread(dummyTags, threadInput);
      expect(result).toEqual(response);
      expect(
        threadRepositoryStub.create.calledOnceWithExactly(
          dummyTags,
          threadInput,
        ),
      ).toEqual(true);
      expect(threadService).toBeInstanceOf(ThreadService);
    });
  });

  describe('edit thread', () => {
    it('updates the title and text fields', async () => {
      const id = v4();
      const dummyQuery = { id, user_id: id };
      const updates = { text: 'text', title: 'title' };
      const returnValue = {
        id,
        text: 'updates',
        title: 'updates',
        user_id: id,
      };
      threadRepositoryStub.patch.resolves(returnValue);
      threadRepositoryStub.getByFilter.resolves({
        text: 'text',
        title: 'title',
        id,
        user_id: id,
      });

      const result = await threadService.editThread(dummyQuery, updates);

      expect(result).toEqual(returnValue);
      expect(
        threadRepositoryStub.patch.calledOnceWithExactly(
          dummyQuery.id,
          updates,
        ),
      ).toEqual(true);
      expect(threadService).toBeInstanceOf(ThreadService);
    });
  });

  describe('remove thread', () => {
    it('deletes a thread', async () => {
      const id = v4();
      const dummyQuery = { id, user_id: id };
      const response = 'thread deleted successfully';
      threadRepositoryStub.getByFilter.resolves(dummyQuery);
      threadRepositoryStub.deleteById.resolves(response);

      const result = await threadService.deleteThread(dummyQuery);

      expect(result).toEqual(response);
      expect(
        threadRepositoryStub.deleteById.calledOnceWithExactly(dummyQuery.id),
      ).toEqual(true);
      expect(
        threadRepositoryStub.getByFilter.calledOnceWithExactly(dummyQuery),
      ).toEqual(true);
      expect(threadService).toBeInstanceOf(ThreadService);
    });
  });
});
