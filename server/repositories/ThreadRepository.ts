import TABLE from '../models';
import { ThreadShape } from '../models/Thread';
import { HttpError } from '../util/HttpError';

export type tagsArr = [string];
export type threadObj = Pick<ThreadShape, 'title' | 'text' | 'user_id'>;
export type threadPatch = Partial<Omit<threadObj, 'user_id'>>;
export type threadFilter = Pick<ThreadShape, 'id' | 'user_id'>;

/* 
Ensure to use filter to obtain user 
thread to avoid issues
*/

class ThreadRepository {
    async getById(id: string) {
        const thread = await TABLE.THREAD.query().findById(id);
        if (!thread) throw new HttpError(404, 'thread not found');
        return thread;
    }

    async getByFilter(filter: threadFilter) {
        const thread = await TABLE.THREAD.query().findOne(filter);
        if (!thread) throw new HttpError(404, 'thread not found');
        return thread;
    }

    async get() {
        return await TABLE.THREAD.query();
    }

    async create(tags: tagsArr, threadData: threadObj) {
        const trx = await TABLE.THREAD.startTransaction();
        try {
            const thread = await TABLE.THREAD.query(trx).insert(threadData);
            const threadTagsIds = tags.map((id) => ({ thread_id: thread.id, tag_id: id }));
            await TABLE.THREADTAG.query(trx).insert(threadTagsIds).returning('*');
            trx.commit();
            return 'thread successfully created';
        } catch (e) {
            trx.rollback();
            throw new HttpError(400, 'error creating thread');
        }
    }

    async patch(id: string, threadData: threadPatch) {
        return await TABLE.THREAD.query().patchAndFetchById(id, threadData);
    }

    async deleteById(id: string) {
        await TABLE.THREAD.query().deleteById(id);
        return 'thread deleted successfully';
    }
}

export default ThreadRepository;
