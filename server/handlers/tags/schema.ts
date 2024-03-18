import Joi from 'joi';

const tagParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const createTagSchema = Joi.object({
  name: Joi.string().required().min(2).max(30),
  description: Joi.string().required().min(5).max(100),
});

const editTagSchema = Joi.object({
  name: Joi.string().required().min(2).max(30),
  description: Joi.string().required().min(5).max(100),
}).or('name', 'description');

export { tagParamSchema, createTagSchema, editTagSchema };
