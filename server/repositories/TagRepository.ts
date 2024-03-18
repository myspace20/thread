import TABLE from '../models';
import { TagShape } from '../models/Tag';
import { HttpError } from '../util/HttpError';

type tagObject = Pick<TagShape, 'name' | 'description'>;

class TagRepository {
  async getById(id: string) {
    const tag = await TABLE.TAG.query().findById(id);
    if (!tag) throw new HttpError(404, 'tag not found');
    return tag;
  }

  async get() {
    return await TABLE.TAG.query();
  }

  async create(tagObject: tagObject) {
    return await TABLE.TAG.query().insert(tagObject);
  }

  async patch(id: string, tagObject: Partial<tagObject>) {
    return await TABLE.TAG.query().patchAndFetchById(id, tagObject);
  }

  async delete(id: string) {
    await TABLE.TAG.query().deleteById(id);
    return 'tag deleted successfully';
  }
}

export default TagRepository;
