import { createPost, postId, postQuery, postUpdate } from '../interfaces';
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

  async setPostAsAccepted(query: postQuery) {
    const post = await this.postRepository.getByFilter(query);
    await this.postRepository.patch(post.id, {
      is_accepted: true,
    });
    return 'post marked as accepted';
  }

  async editPost(query: postQuery, data: postUpdate) {
    const post = await this.postRepository.getByFilter(query);
    return await this.postRepository.patch(post.id, data);
  }

  async deletePost(query: postQuery) {
    const post = await this.postRepository.getByFilter(query);
    return await this.postRepository.delete(post.id);
  }
}

export default PostService;
