import PostRepository, { PostFilter, PostInsert, PostPatch } from '../repositories/PostRepository';

class PostService {
  private postRepository = new PostRepository();

  async getById(id: string) {
    return this.postRepository.getById(id);
  }

  async create(postData: PostInsert) {
    return this.postRepository.create(postData);
  }

  async editPost(filter: PostFilter, postData: PostPatch) {
    const post = await this.postRepository.getByFilter(filter);
    return await this.postRepository.patch(post.id, postData);
  }

  async deletePost(filter: PostFilter) {
    const post = await this.postRepository.getByFilter(filter);
    return await this.postRepository.delete(post.id);
  }
}

export default PostService;
