import { Request, Response } from 'express';
import VoteService from '../../services/VoteService';

export const castThreadVote = async (req: Request, res: Response) => {
    const voteService = new VoteService();
    const data = { thread_id: req.params.thread_id, user_id: '', ...req.body };
    const result = await voteService.castVote(data);
    res.send(result);
};
