import Joi from 'joi';

const voteSchema = Joi.object({
  post_id: Joi.string().required().uuid(),
  type: Joi.string(),
  thread_id: Joi.string().required().uuid(),
  user_id: Joi.string().required().uuid(),
}).nand('post_id', 'thread_id');

export { voteSchema };
