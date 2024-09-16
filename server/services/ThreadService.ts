import {
  ReqQueryOptions,
  createThread,
  tagArray,
  threadId,
  threadQuery,
  threadUpdate,
} from '../interfaces';
import ThreadRepository from '../repositories/ThreadRepository';

class ThreadService {
  private threadRepository = new ThreadRepository();

  async getById(id: threadId) {
    return await this.threadRepository.getById(id);
  }

  async getThreads(options: ReqQueryOptions) {
    return await this.threadRepository.get(options);
  }

  async createThread(tags: tagArray, threadData: createThread) {
    return await this.threadRepository.create(tags, threadData);
  }

  async editThread(query: threadQuery, threadData: threadUpdate) {
    const thread = await this.threadRepository.getByFilter(query);
    return await this.threadRepository.patch(thread.id, threadData);
  }

  async deleteThread(query: threadQuery) {
    const thread = await this.threadRepository.getByFilter(query);
    return await this.threadRepository.deleteById(thread.id);
  }
}

export default ThreadService;
