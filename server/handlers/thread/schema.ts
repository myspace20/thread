import Joi from 'joi';

const threadParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const createThreadSchema = Joi.object({
  title: Joi.string().required().min(5).max(120),
  text: Joi.string().required().min(5).max(120),
  user_id: Joi.string().uuid().required(),
});

const editThreadSchema = Joi.object({
  title: Joi.string().required().min(5).max(120),
  text: Joi.string().required().min(5).max(120),
}).or('title', 'text');

const threadQuerySchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  id: Joi.string().uuid().required(),
});

const threadTagList = Joi.array().items(Joi.string().required());

export {
  threadParamSchema,
  createThreadSchema,
  editThreadSchema,
  threadQuerySchema,
  threadTagList,
};
