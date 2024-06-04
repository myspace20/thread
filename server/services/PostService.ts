import { createPost, postId, postQuery, postUpdate } from '../interfaces';
import PostRepository from '../repositories/PostRepository';

class PostService {
  private postRepository = new PostRepository();

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
    return 'Post marked as accepted';
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
