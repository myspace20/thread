import { createThread, tagArray, threadId, threadQuery } from '../interfaces';
import TABLE from '../models';
import { HttpError } from '../util/HttpError';

class ThreadRepository {
  async getById(id: threadId) {
    const thread = await TABLE.THREAD.query().findById(id).withGraphFetched('posts');
    if (!thread) throw new HttpError(404, 'thread not found');
    return thread;
  }

  async getByFilter(query: threadQuery) {
    const thread = await TABLE.THREAD.query().findOne(query);
    if (!thread) throw new HttpError(404, 'thread not found');
    return thread;
  }

  async get() {
    return await TABLE.THREAD.query();
  }

  async create(tags: tagArray, threadData: createThread) {
    const trx = await TABLE.THREAD.startTransaction();
    try {
      const thread = await TABLE.THREAD.query(trx).insert(threadData);
      const threadTagsIds = tags.map((id) => ({
        thread_id: thread.id,
        tag_id: id,
      }));
      await TABLE.THREADTAG.query(trx).insert(threadTagsIds).returning('*');
      trx.commit();
      return 'thread successfully created';
    } catch (e) {
      trx.rollback();
      throw new HttpError(400, 'error creating thread');
    }
  }

  async patch(id: threadId, threadData: threadQuery) {
    return await TABLE.THREAD.query().patchAndFetchById(id, threadData);
  }

  async deleteById(id: threadId) {
    await TABLE.THREAD.query().deleteById(id);
    return 'thread deleted successfully';
  }
}

export default ThreadRepository;
