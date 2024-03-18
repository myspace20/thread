import Joi from 'joi';

const authParamSchema = Joi.object({
  token: Joi.string().uuid().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required().min(8).max(16),
});

const signUpSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required().min(8).max(16),
  display_name: Joi.string().required().min(5).max(30),
});

const completeProfileSchema = Joi.object({
  description: Joi.string().required().min(10).max(80),
  image_url: Joi.string().required().base64(),
});

const updateProfileSchema = Joi.object({
  display_name: Joi.string().required().min(5).max(30),
  description: Joi.string().required().min(10).max(80),
  image_url: Joi.string().required().base64(),
}).or('display_name', 'description', 'image_url');

const updatePasswordSchema = Joi.object({
  password: Joi.string().required().min(8).max(16),
});

const passwordResetRequestSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

export {
  loginSchema,
  authParamSchema,
  signUpSchema,
  completeProfileSchema,
  updateProfileSchema,
  updatePasswordSchema,
  passwordResetRequestSchema,
};
