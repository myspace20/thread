import TABLE from '../models';
import { commentShape } from '../models/Comment';
import { HttpError } from '../util/HttpError';

/* 
    Use fail fast to ensure the that at 
    either post_id or thread_id is present.
    Very important !!!
*/

export type Comment = Pick<commentShape, 'text' | 'thread_id' | 'user_id' | 'post_id'>;
// type postComment = Pick<commentShape, "text" | "post_id" | "user_id">
export type commentPatch = Pick<commentShape, 'text' | 'thread_id' | 'user_id' | 'post_id'>;
// type postCommentPatch = Pick<commentShape, "text"|"post_id"|"user_id">
export type Filter = Pick<commentShape, 'user_id' | 'post_id' | 'thread_id'>;

//Make some ids required

class CommentRepository {
    async getById(id: string) {
        const comment = await TABLE.COMMENT.query().findById(id);
        if (!comment) throw new HttpError(404, 'comment not found');
        return comment;
    }

    async getByFilter(filter: Filter) {
        const comment = await TABLE.COMMENT.query().findOne(filter);
        if (!comment) throw new HttpError(404, 'comment not found');
        return comment;
    }

    async createComment(data: Comment) {
        return await TABLE.COMMENT.query().insert(data);
    }

    async editComment(id: string, data: any) {
        return await TABLE.COMMENT.query().patchAndFetchById(id, data);
    }

    async deleteComment(id: string) {
        await TABLE.COMMENT.query().deleteById(id);
        return 'comment deleted successfully';
    }
}

export default CommentRepository;
