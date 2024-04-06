import { Request, Response } from 'express';
import CommentService from '../../services/CommentService';
import {
  commentTextSchema,
  createPostCommentSchema,
  createThreadCommentSchema,
  postCommentQuerySchema,
  threadCommentQuerySchema,
} from './schema';

export const createThreadComment = async (req: Request, res: Response) => {
  const commentObject = {
    thread_id: req.params.thread_id,
    user_id: req.user.userId,
    ...req.body,
  };
  await createThreadCommentSchema.validateAsync(commentObject, {
    abortEarly: false,
  });
  const commentService = new CommentService();
  const result = await commentService.addThreadComment(commentObject);
  res.status(201).send(result);
};

export const createPostComment = async (req: Request, res: Response) => {
  const commentObject = {
    post_id: req.params.post_id,
    user_id: req.user.userId,
    ...req.body,
  };
  await createPostCommentSchema.validateAsync(commentObject, {
    abortEarly: false,
  });
  const commentService = new CommentService();
  const result = await commentService.addPostComment(commentObject);
  res.status(201).send(result);
};

export const editThreadComment = async (req: Request, res: Response) => {
  const commentQueryObject = {
    id: req.params.id,
    thread_id: req.params.thread_id,
    user_id: req.user.userId,
  };
  await threadCommentQuerySchema.validateAsync(commentQueryObject, {
    abortEarly: false,
  });
  await commentTextSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const commentService = new CommentService();
  const result = await commentService.editThreadComment(commentQueryObject, req.body);
  res.send(result);
};

export const editPostComment = async (req: Request, res: Response) => {
  const commentQueryObject = {
    id: req.params.id,
    post_id: req.params.post_id,
    user_id: req.user.userId,
  };
  await postCommentQuerySchema.validateAsync(commentQueryObject, {
    abortEarly: false,
  });
  await commentTextSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const commentService = new CommentService();
  const result = await commentService.editPostComment(commentQueryObject, req.body);
  res.send(result);
};

export const deleteThreadComment = async (req: Request, res: Response) => {
  const commentQueryObject = {
    id: req.params.id,
    thread_id: req.params.thread_id,
    user_id: req.user.userId,
  };
  await threadCommentQuerySchema.validateAsync(commentQueryObject, {
    abortEarly: false,
  });
  const commentService = new CommentService();
  const result = await commentService.deleteThreadComment(commentQueryObject);
  res.status(204).send(result);
};

export const deletePostComment = async (req: Request, res: Response) => {
  const commentQueryObject = {
    id: req.params.id,
    post_id: req.params.post_id,
    user_id: req.user.userId,
  };
  await postCommentQuerySchema.validateAsync(commentQueryObject, {
    abortEarly: false,
  });
  const commentService = new CommentService();
  const result = await commentService.deletePostComment(commentQueryObject);
  res.status(204).send(result);
};
