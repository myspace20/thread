import { Request, Response } from 'express';
import ThreadService from '../../services/ThreadService';
import { createThreadSchema, editThreadSchema, threadQuerySchema, threadTagList } from './schema';

export const threadsGet = async (req: Request, res: Response) => {
  const threadService = new ThreadService();
  const threads = await threadService.getThreads();
  res.send(threads);
};

export const threadPost = async (req: Request, res: Response) => {
  const threadObject = {
    ...req.body.threadData,
    user_id: req.user.userId,
  };
  await createThreadSchema.validateAsync(threadObject, {
    abortEarly: false,
  });
  //Tags array validation
  await threadTagList.validateAsync(req.body.tags, { abortEarly: false });
  const threadService = new ThreadService();
  const result = await threadService.createThread(req.body.tags, threadObject);
  res.status(201).send(result);
};

export const editThread = async (req: Request, res: Response) => {
  const threadQueryObject = {
    id: req.params.id,
    user_id: req.user.userId,
  };
  await threadQuerySchema.validateAsync(threadQueryObject, {
    abortEarly: false,
  });
  await editThreadSchema.validateAsync(req.body);
  const threadService = new ThreadService();
  const result = await threadService.editThread(threadQueryObject, req.body);
  res.send(result);
};

export const deleteThread = async (req: Request, res: Response) => {
  const threadQueryObject = {
    id: req.params.id,
    user_id: req.user.userId,
  };
  await threadQuerySchema.validateAsync(threadQueryObject, {
    abortEarly: false,
  });
  const threadService = new ThreadService();
  const result = await threadService.deleteThread(threadQueryObject);
  res.status(204).send(result);
};
