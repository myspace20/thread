import CommentRepository, { Comment, Filter } from '../repositories/CommentRepository';
import PostRepository from '../repositories/PostRepository';
import ThreadRepository from '../repositories/ThreadRepository';

type PostCommentDto = {
  post_id: string;
  text: string;
  user_id: string;
};
type threadCommentDto = {
  thread_id: string;
  text: string;
  user_id: string;
};
type ThreadComment = Pick<Comment, 'thread_id' | 'text' | 'user_id'>;
type commentEdit = {
  text: string;
};

//remove comments for posts and threads

class CommentService {
  private commentRepository = new CommentRepository();
  private threadRepository = new ThreadRepository();
  private postRepository = new PostRepository();

  async getCommentById(id: string) {
    return this.commentRepository.getById(id);
  }

  async addThreadComment(commentData: threadCommentDto) {
    await this.threadRepository.getById(commentData.thread_id);
    return await this.commentRepository.createComment(commentData);
  }

  async addPostComment(commentData: PostCommentDto) {
    await this.postRepository.getById(commentData.post_id);
    return await this.commentRepository.createComment(commentData);
  }

  async editThreadComment(filter: Filter, commentData: commentEdit) {
    const comment = await this.commentRepository.getByFilter(filter);
    return await this.commentRepository.editComment(comment.id, commentData);
  }

  async editPostComment(filter: Filter, commentData: commentEdit) {
    const comment = await this.commentRepository.getByFilter(filter);
    return await this.commentRepository.editComment(comment.id, commentData);
  }

  async deleteThreadComment(filter: Filter) {
    const threadComment = await this.commentRepository.getByFilter(filter);
    return await this.commentRepository.deleteComment(threadComment.id);
  }

  async deletePostComment(filter: Filter) {
    const postComment = await this.commentRepository.getByFilter(filter);
    return await this.commentRepository.deleteComment(postComment.id);
  }
}

export default CommentService;
