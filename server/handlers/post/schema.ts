import Joi from 'joi';

const postParamsSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const createPostSchema = Joi.object({
  text: Joi.string().required().min(5).max(400),
  thread_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
});

const postQuerySchema = Joi.object({
  post_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
});

const postTextSchema = Joi.object({
  text: Joi.string().required().min(5).max(400),
});

export { postParamsSchema, createPostSchema, postQuerySchema, postTextSchema };
