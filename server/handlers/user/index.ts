import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import {
  activateProfileSchema,
  authParamSchema,
  passwordResetRequestSchema,
  signUpSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from '../auth/schema';
import { sigupCounter } from '../../util/metrics';
import uploads from '../../infra/file-storage/uploads';

export const createUserAccount = async (req: Request, res: Response) => {
  await signUpSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const userService = new UserService();
  const email = await userService.signUp(req.body);
  sigupCounter.inc();
  res.send(email);
};

export const userVerifyAccount = async (req: Request, res: Response) => {
  await authParamSchema.validateAsync(req.params, {
    abortEarly: false,
  });
  const userService = new UserService();
  await userService.verifyUserAccount(req.params.token);
  res.send('account verified successfully');
};

export const requestUserPasswordReset = async (req: Request, res: Response) => {
  await passwordResetRequestSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const userService = new UserService();
  const passwordResetRequest = await userService.requestUserPasswordReset(req.body.email);
  res.send(passwordResetRequest);
};

export const resetUserPassword = async (req: Request, res: Response) => {
  await authParamSchema.validateAsync(req.params, {
    abortEarly: false,
  });
  await updatePasswordSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const userService = new UserService();
  const passwordReset = await userService.resetUserPassword(req.body.password, req.params.token);
  res.send(passwordReset);
};

export const activateUser = async (req: Request, res: Response) => {
  const userService = new UserService();
  const image_url = await uploads.uploadToSupabase(req.file);
  const data = {
    description: req.body.description,
    image_url,
    active: true,
    profile_complete: true,
  };
  await activateProfileSchema.validateAsync(data, { abortEarly: false });
  await userService.activateUser(req.user.userId, data);
  res.send('profile updated sucessfully');
};

export const updateProfile = async (req: Request, res: Response) => {
  const userService = new UserService();
  let image;
  if (req.file) {
    const image_url = await uploads.uploadToSupabase(req.file);
    image = image_url;
  }
  const data = {
    description: req.body.description,
    image_url: image,
    display_name: req.body.display_name,
  };
  await updateProfileSchema.validateAsync(data, { abortEarly: false });
  await userService.activateUser(req.user.userId, data);
  res.send('profile updated sucessfully');
};
