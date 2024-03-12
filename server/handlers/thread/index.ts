import { Request, Response } from 'express';
import ThreadService from '../../services/ThreadService';

export const threadsGet = async (req: Request, res: Response) => {
    const threadService = new ThreadService();
    const threads = await threadService.getThreads();
    res.send(threads);
};

export const threadPost = async (req: Request, res: Response) => {
    const threadService = new ThreadService();
    const threadDTO = { ...req.body.threadData, user_id: res.locals.user.userId };
    const result = await threadService.createThread(req.body.tags, threadDTO);
    res.status(201).send(result);
};

export const editThread = async (req: Request, res: Response) => {
    const query = { id: req.params.id, user_id: res.locals.user.userId };
    const threadService = new ThreadService();
    const result = await threadService.editThread(query, req.body);
    res.send(result);
};

export const deleteThread = async (req: Request, res: Response) => {
    const query = { id: req.params.id, user_id: res.locals.user.userId };
    const threadService = new ThreadService();
    const result = await threadService.deleteThread(query);
    res.status(204).send(result);
};
