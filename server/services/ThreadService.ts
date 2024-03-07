import ThreadRepository, { tagsArr, threadFilter, threadObj, threadPatch } from '../repositories/ThreadRepository';
import { HttpError } from '../util/HttpError';

class ThreadService {
    private threadRepository = new ThreadRepository();

    async getById(id: string) {
        return this.threadRepository.getById(id);
    }

    async getThreads() {
        return this.threadRepository.get();
    }

    async createThread(tags: tagsArr, threadData: threadObj) {
        return this.threadRepository.create(tags, threadData);
    }

    async editThread(filter: threadFilter, threadData: threadPatch) {
        const thread = await this.threadRepository.getByFilter(filter);
        return this.threadRepository.patch(thread.id, threadData);
    }

    async deleteThread(filter: threadFilter) {
        const thread = await this.threadRepository.getByFilter(filter);
        return this.threadRepository.deleteById(thread.id);
    }
}

export default ThreadService;
