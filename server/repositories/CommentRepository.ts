import { commentId, commentQuery, commentUpdate, createComment } from '../interfaces';
import TABLE from '../models';
import { HttpError } from '../util/HttpError';

class CommentRepository {
  async getById(id: commentId) {
    const comment = await TABLE.COMMENT.query().findById(id);
    if (!comment) throw new HttpError(404, 'comment not found');
    return comment;
  }

  async getByFilter(query: commentQuery) {
    const comment = await TABLE.COMMENT.query().findOne(query);
    if (!comment) throw new HttpError(404, 'comment not found');
    return comment;
  }

  async createComment(data: createComment) {
    return await TABLE.COMMENT.query().insert(data);
  }

  async editComment(id: commentId, data: commentUpdate) {
    return await TABLE.COMMENT.query().patchAndFetchById(id, data);
  }

  async deleteComment(id: commentId) {
    await TABLE.COMMENT.query().deleteById(id);
    return 'comment deleted successfully';
  }
}

export default CommentRepository;
