import { Request, Response } from 'express';
import VoteService from '../../services/VoteService';
import { voteSchema } from './schema';

export const castThreadVote = async (req: Request, res: Response) => {
  const voteObject = { thread_id: req.params.thread_id, user_id: res.locals.user.userId, ...req.body };
  await voteSchema.validateAsync(voteObject, { abortEarly: false });
  const voteService = new VoteService();
  const result = await voteService.castVote(voteObject);
  res.status(200).send(result);
};

export const castPostVote = async (req: Request, res: Response) => {
  const voteObject = { post_id: req.params.post_id, user_id: res.locals.user.userId, ...req.body };
  await voteSchema.validateAsync(voteObject, { abortEarly: false });
  const voteService = new VoteService();
  const result = await voteService.castVote(voteObject);
  res.status(200).send(result);
};
