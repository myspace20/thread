import { Request, Response, response } from 'express';
import CommentService from '../../services/CommentService';

export const createThreadComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const threadCommentDto = { thread_id: req.params.thread_id, user_id: res.locals.user.userId, ...req.body };
    const result = await commentService.addThreadComment(threadCommentDto);
    res.status(201).send(result);
};

export const createPostComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const data = { post_id: req.params.post_id, user_id: res.locals.user.userId, ...req.body };
    const result = await commentService.addPostComment(data);
    res.status(201).send(result);
};

export const editThreadComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const query = { thread_id: req.params.thread_id, user_id: res.locals.user.userId, id: req.params.id };
    const result = await commentService.editThreadComment(query, req.body);
    res.send(result);
};

export const editPostComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const query = { post_id: req.params.post_id, user_id: res.locals.user.userId, id: req.params.id };
    const result = await commentService.editPostComment(query, req.body);
    res.send(result);
};

export const deleteThreadComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const query = { thread_id: req.params.thread_id, user_id: res.locals.user.userId };
    const result = await commentService.deleteThreadComment(query);
    res.status(204).send(result);
};

export const deletePostComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const query = { post_id: req.params.post_id, user_id: res.locals.user.userId };
    const result = await commentService.deletePostComment(query);
    res.status(204).send(result);
};
