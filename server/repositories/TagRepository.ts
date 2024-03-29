import { createTag, tagId, tagQuery, tagUpdate } from '../interfaces';
import TABLE from '../models';
import { HttpError } from '../util/HttpError';

class TagRepository {
  async getById(id: tagId) {
    const tag = await TABLE.TAG.query().findById(id);
    if (!tag) throw new HttpError(404, 'tag not found');
    return tag;
  }

  async get() {
    return await TABLE.TAG.query();
  }

  async create(data: createTag) {
    return await TABLE.TAG.query().insert(data);
  }

  async patch(id: tagId, query: tagUpdate) {
    return await TABLE.TAG.query().patchAndFetchById(id, query);
  }

  async delete(id: tagId) {
    await TABLE.TAG.query().deleteById(id);
    return 'tag deleted successfully';
  }
}

export default TagRepository;
