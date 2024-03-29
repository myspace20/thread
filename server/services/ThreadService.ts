import { createThread, tagArray, threadId, threadQuery, threadUpdate } from '../interfaces';
import ThreadRepository from '../repositories/ThreadRepository';
import { HttpError } from '../util/HttpError';

class ThreadService {
  private threadRepository = new ThreadRepository();

  async getById(id: threadId) {
    return this.threadRepository.getById(id);
  }

  async getThreads() {
    return this.threadRepository.get();
  }

  async createThread(tags: tagArray, threadData: createThread) {
    return this.threadRepository.create(tags, threadData);
  }

  async editThread(query: threadQuery, threadData: threadUpdate) {
    const thread = await this.threadRepository.getByFilter(query);
    return this.threadRepository.patch(thread.id, threadData);
  }

  async deleteThread(query: threadQuery) {
    const thread = await this.threadRepository.getByFilter(query);
    if (thread.user_id === query.user_id) throw new HttpError(403, 'permission denied');
    return this.threadRepository.deleteById(thread.id);
  }
}

export default ThreadService;
