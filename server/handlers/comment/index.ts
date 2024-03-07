import { Request, Response } from 'express';
import CommentService from '../../services/CommentService';

export const createThreadComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const data = { thread_id: req.params.thread_id, user_id: '', ...req.body };
    const result = await commentService.addThreadComment(data);
    res.status(201).send(result);
};

export const createPostComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const data = { post_id: req.params.post_id, user_id: '', ...req.body };
    const result = await commentService.addPostComment(data);
    res.status(201).send(result);
};

export const editThreadComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const query = { thread_id: req.params.thread_id, user_id: '' };
    const result = await commentService.editThreadComment(query, req.body);
    res.send(result);
};

export const deleteThreadComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const query = { thread_id: req.params.thread_id, user_id: '' };
    const result = await commentService.deleteThreadComment(query);
    res.status(204).send(result);
};

export const deletePostComment = async (req: Request, res: Response) => {
    const commentService = new CommentService();
    const query = { post_id: req.params.post_id, user_id: '' };
    const result = await commentService.deletePostComment(query);
    res.status(204).send(result);
};
