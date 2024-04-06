import Joi from 'joi';

const commentParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const createThreadCommentSchema = Joi.object({
  thread_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
  text: Joi.string().required().min(5).max(150),
});

const createPostCommentSchema = Joi.object({
  post_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
  text: Joi.string().required().min(5).max(150),
});

const threadCommentQuerySchema = Joi.object({
  id: Joi.string().uuid().required(),
  thread_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
});

const postCommentQuerySchema = Joi.object({
  id: Joi.string().uuid().required(),
  post_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
});

const commentTextSchema = Joi.object({
  text: Joi.string().required().min(5).max(150),
});

export {
  commentParamSchema,
  createThreadCommentSchema,
  createPostCommentSchema,
  threadCommentQuerySchema,
  postCommentQuerySchema,
  commentTextSchema,
};
