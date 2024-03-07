import { Request, Response } from 'express';
import TagService from '../../services/TagService';

export const createTagPost = async (req: Request, res: Response) => {
    const tagService = new TagService();
    const result = await tagService.createTag(req.body);
    res.status(201).send(result);
};

export const editTag = async (req: Request, res: Response) => {
    const tagService = new TagService();
    const tag_id = req.params.tag_id;
    const result = await tagService.editTag(tag_id, req.body);
    res.status(204).send(result);
};

export const deleteTag = async (req: Request, res: Response) => {
    const tagService = new TagService();
    const tag_id = req.params.tag_id;
    const result = await tagService.deleteTag(tag_id);
    res.status(204).send(result);
};