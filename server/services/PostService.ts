import { createPost, postId, postQuery } from '../interfaces';
import PostRepository from '../repositories/PostRepository';
import ThreadRepository from '../repositories/ThreadRepository';
import { HttpError } from '../util/HttpError';

class PostService {
  private postRepository = new PostRepository();
  private threadRepository = new ThreadRepository();

  async getById(id: postId) {
    return this.postRepository.getById(id);
  }

  async create(data: createPost) {
    return this.postRepository.create(data);
  }

  async setPostAsAccepted(query: postQuery, id: postId) {
    //get owner of thread
    const thread = await this.threadRepository.getByFilter(query);
    if (thread.user_id != query.user_id) {
      throw new HttpError(403, 'permission denied');
    }
    //get post to set as accepted
    const post = await this.postRepository.getById(id);
    if (post.thread_id != thread.id) {
      throw new HttpError(403, 'permission denied');
    }
    await this.postRepository.patch(post.id, {
      is_accepted: true,
    });
    return 'post marked as accepted';
  }

  async editPost(query: postQuery, data: postQuery) {
    const post = await this.postRepository.getByFilter(query);
    if (post.user_id != query.user_id) throw new HttpError(403, 'permission denied');
    return await this.postRepository.patch(post.id, data);
  }

  async deletePost(query: postQuery) {
    const post = await this.postRepository.getByFilter(query);
    if (post.user_id != query.user_id) throw new HttpError(403, 'permission denied');
    return await this.postRepository.delete(post.id);
  }
}

export default PostService;
