import CommentRepository, { Comment, Filter } from '../repositories/CommentRepository';

type PostComment = Pick<Comment, 'post_id' | 'text' | 'user_id'>;
type ThreadComment = Pick<Comment, 'thread_id' | 'text' | 'user_id'>;
type commentEdit = {
    text?: string;
    title?: string;
};

//remove comments for posts and threads

class CommentService {
    private commentRepository = new CommentRepository();

    async getCommentById(id: string) {
        return this.commentRepository.getById(id);
    }

    async addThreadComment(commentData: ThreadComment) {
        return await this.commentRepository.createComment(commentData);
    }

    async addPostComment(commentData: PostComment) {
        return await this.commentRepository.createComment(commentData);
    }

    async editThreadComment(filter: Filter, commentData: commentEdit) {
        const thread = await this.commentRepository.getByFilter(filter);
        return await this.commentRepository.editComment(thread.id, commentData);
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
