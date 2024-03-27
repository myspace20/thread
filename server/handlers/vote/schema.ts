import Joi from 'joi';

const threadvoteSchema = Joi.object({
  type: Joi.string().valid('up', 'down').required(),
  thread_id: Joi.string().required().uuid(),
  user_id: Joi.string().required().uuid(),
});

const postvoteSchema = Joi.object({
  post_id: Joi.string().required().uuid(),
  type: Joi.string().valid('up', 'down').required(),
  user_id: Joi.string().required().uuid(),
});

export { threadvoteSchema, postvoteSchema };
