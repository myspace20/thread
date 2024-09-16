import { Request, Response } from 'express';
import TagService from '../../services/TagService';
import { createTagSchema, editTagSchema, tagParamSchema } from './schema';
import { ReqQueryOptions } from '../../interfaces';

export const allTagsGet = async (req: Request, res: Response) => {
  const options = req.query as unknown as ReqQueryOptions;
  const tagService = new TagService();
  const result = await tagService.getAllTags(options);
  res.send(result);
};

export const createTagPost = async (req: Request, res: Response) => {
  await createTagSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const tagService = new TagService();
  const result = await tagService.createTag(req.body);
  res.status(201).send(result);
};

export const editTag = async (req: Request, res: Response) => {
  await tagParamSchema.validateAsync(req.params, {
    abortEarly: false,
  });
  await editTagSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const tagService = new TagService();
  const tag_id = req.params.tag_id;
  const result = await tagService.editTag(tag_id, req.body);
  res.status(204).send(result);
};

export const deleteTag = async (req: Request, res: Response) => {
  await tagParamSchema.validateAsync(req.params, {
    abortEarly: false,
  });
  const tagService = new TagService();
  const tag_id = req.params.tag_id;
  const result = await tagService.deleteTag(tag_id);
  res.status(204).send(result);
};
