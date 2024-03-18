import TABLE from '../models';
import { PostShape } from '../models/Post';
import { HttpError } from '../util/HttpError';

type PostInsert = Pick<PostShape, 'text' | 'user_id' | 'thread_id'>;
type PostPatch = Pick<PostShape, 'text'>;
type PostFilter = Pick<PostShape, 'thread_id' | 'user_id'>;

export { PostInsert, PostPatch, PostFilter };

class PostRepository {
  async getById(id: string) {
    const post = await TABLE.POST.query().findById(id);
    if (!post) throw new HttpError(404, 'post not found');
    return post;
  }

  async getByFilter(filter: PostFilter) {
    const post = await TABLE.POST.query().findOne(filter);
    if (!post) throw new HttpError(404, 'post not found');
    return post;
  }

  async create(postObj: PostInsert) {
    return await TABLE.POST.query().insert(postObj);
  }

  async patch(id: string, postObj: PostPatch) {
    return await TABLE.POST.query().patchAndFetchById(id, postObj);
  }

  async delete(id: string) {
    await TABLE.POST.query().deleteById(id);
    return 'post deleted successfully';
  }
}

export default PostRepository;
