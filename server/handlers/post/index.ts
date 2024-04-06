import { Request, Response } from 'express';
import PostService from '../../services/PostService';
import { createPostSchema, postQuerySchema, postTextSchema } from './schema';

export const createPost = async (req: Request, res: Response) => {
  const postObject = {
    ...req.body,
    thread_id: req.params.thread_id,
    user_id: req.user.userId,
  };
  await createPostSchema.validateAsync(postObject, {
    abortEarly: false,
  });
  const postService = new PostService();
  const result = await postService.create(postObject);
  res.status(201).send(result);
};

export const editPost = async (req: Request, res: Response) => {
  const postQueryObject = {
    id: req.params.id,
    thread_id: req.params.thread_id,
    user_id: req.user.userId,
  };
  await postQuerySchema.validateAsync(postQueryObject, {
    abortEarly: false,
  });
  await postTextSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const postService = new PostService();
  const result = await postService.editPost(postQueryObject, req.body);
  res.send(result);
};

export const setPostAsAccepted = async (req: Request, res: Response) => {
  const postQueryObject = {
    thread_id: req.params.thread_id,
    id: req.params.id,
    user_id: req.user.userId,
  };
  const postService = new PostService();
  const result = await postService.setPostAsAccepted(postQueryObject);
  res.send(result);
};

export const deletePost = async (req: Request, res: Response) => {
  const postQueryObject = {
    id: req.params.id,
    thread_id: req.params.thread_id,
    user_id: req.user.userId,
  };
  await postQuerySchema.validateAsync(postQueryObject, {
    abortEarly: false,
  });
  const postService = new PostService();
  const result = await postService.deletePost(postQueryObject);
  res.status(204).send(result);
};
