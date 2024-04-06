import Joi from 'joi';

// const postParamsSchema = Joi.object({
//   id: Joi.string().uuid().required(),
//   thread_id: Joi.string().uuid().required(),
// }).or('id', 'thread_id');

const createPostSchema = Joi.object({
  text: Joi.string().required().min(5).max(400),
  thread_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
});

const postQuerySchema = Joi.object({
  id: Joi.string().uuid().required(),
  thread_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
});

const postTextSchema = Joi.object({
  text: Joi.string().required().min(5).max(400),
});

export { createPostSchema, postQuerySchema, postTextSchema };
