import { createPost, postId, postQuery, postUpdate } from '../interfaces';
import TABLE from '../models';
import { HttpError } from '../util/HttpError';

class PostRepository {
  async getById(id: postId) {
    const post = await TABLE.POST.query().findById(id);
    if (!post) throw new HttpError(404, 'post not found');
    return post;
  }

  async getByFilter(query: postQuery) {
    const post = await TABLE.POST.query().findOne(query);
    if (!post) throw new HttpError(404, 'post not found');
    return post;
  }

  async create(data: createPost) {
    await TABLE.POST.query().insert(data);
    return;
  }

  async patch(id: postId, data: postUpdate) {
    await TABLE.POST.query().patchAndFetchById(id, data);
    return;
  }

  async delete(id: postId) {
    await TABLE.POST.query().deleteById(id);
    return 'post deleted successfully';
  }
}

export default PostRepository;
