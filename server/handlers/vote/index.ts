import { Request, Response } from 'express';
import VoteService from '../../services/VoteService';
import { postvoteSchema, threadvoteSchema } from './schema';

export const castThreadVote = async (req: Request, res: Response) => {
  const voteObject = {
    thread_id: req.params.thread_id,
    user_id: req.user.userId,
    ...req.body,
  };
  await threadvoteSchema.validateAsync(voteObject, {
    abortEarly: false,
  });
  const voteService = new VoteService();
  const result = await voteService.castVote(voteObject);
  res.status(200).send(result);
};

export const castPostVote = async (req: Request, res: Response) => {
  const voteObject = {
    post_id: req.params.post_id,
    user_id: req.user.userId,
    ...req.body,
  };
  await postvoteSchema.validateAsync(voteObject, {
    abortEarly: false,
  });
  const voteService = new VoteService();
  const result = await voteService.castVote(voteObject);
  res.status(200).send(result);
};
