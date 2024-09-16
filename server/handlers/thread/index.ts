import { Request, Response } from 'express';
import ThreadService from '../../services/ThreadService';
import {
  createThreadSchema,
  editThreadSchema,
  threadParamSchema,
  threadQuerySchema,
  threadTagList,
} from './schema';
import { threadCounter } from '../../util/metrics';
import { ReqQueryOptions } from '../../interfaces';

export const threadsGet = async (req: Request, res: Response) => {
  const options = req.query as unknown as ReqQueryOptions;
  const threadService = new ThreadService();
  const threads = await threadService.getThreads(options);
  res.send(threads);
};

export const threadGet = async (req: Request, res: Response) => {
  await threadParamSchema.validateAsync(req.params, { abortEarly: false });
  const threadService = new ThreadService();
  const thread = await threadService.getById(req.params.id);
  res.send(thread);
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
  threadCounter.inc();
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
