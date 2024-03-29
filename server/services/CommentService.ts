import {
  commentId,
  commentQuery,
  commentUpdate,
  createPostComment,
  createThreadComment,
} from '../interfaces';
import CommentRepository from '../repositories/CommentRepository';
import PostRepository from '../repositories/PostRepository';
import ThreadRepository from '../repositories/ThreadRepository';

class CommentService {
  private commentRepository = new CommentRepository();
  private threadRepository = new ThreadRepository();
  private postRepository = new PostRepository();

  async getCommentById(id: commentId) {
    return this.commentRepository.getById(id);
  }

  async addThreadComment(data: createThreadComment) {
    await this.threadRepository.getById(data.thread_id);
    return await this.commentRepository.createComment(data);
  }

  async addPostComment(data: createPostComment) {
    await this.postRepository.getById(data.post_id);
    return await this.commentRepository.createComment(data);
  }

  async editThreadComment(query: commentQuery, data: commentUpdate) {
    const comment = await this.commentRepository.getByFilter(query);
    return await this.commentRepository.editComment(comment.id, data);
  }

  async editPostComment(query: commentQuery, data: commentUpdate) {
    const comment = await this.commentRepository.getByFilter(query);
    return await this.commentRepository.editComment(comment.id, data);
  }

  async deleteThreadComment(query: commentQuery) {
    const threadComment = await this.commentRepository.getByFilter(query);
    return await this.commentRepository.deleteComment(threadComment.id);
  }

  async deletePostComment(query: commentQuery) {
    const postComment = await this.commentRepository.getByFilter(query);
    return await this.commentRepository.deleteComment(postComment.id);
  }
}

export default CommentService;
