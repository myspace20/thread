import { Request, Response } from 'express';
import PostService from '../../services/PostService';

export const createPost = async (req: Request, res: Response) => {
    const postService = new PostService();
    const postDto = { ...req.body, thread_id: req.params.thread_id, user_id: res.locals.user.userId };
    const result = await postService.create(postDto);
    res.status(201).send(result);
};

export const editPost = async (req: Request, res: Response) => {
    const query = { thread_id: req.params.thread_id, user_id: res.locals.user.userId };
    const postService = new PostService();
    const result = await postService.editPost(query, req.body);
    res.send(result);
};

export const deletePost = async (req: Request, res: Response) => {
    const query = { thread_id: req.params.thread_id, user_id: res.locals.user.userId };
    const postService = new PostService();
    const result = await postService.deletePost(query);
    res.status(204).send(result);
};
