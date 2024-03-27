import { Request, Response } from 'express';
import AuthService from '../../services/AuthService';
import { JWTService } from '../../services/JWTService';
import configs from '../../../config/default';
import { loginSchema } from './schema';

export const authLoginPost = async (req: Request, res: Response) => {
  await loginSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const authService = new AuthService();
  const auth = await authService.login(req.body);
  const accessToken = JWTService.sign(
    auth,
    configs.keys.accessTokenPrivateKey,
    configs.accessTokenSigningOptions,
  );
  const refreshToken = JWTService.sign(
    auth,
    configs.keys.refreshTokenPrivateKey,
    configs.refreshTokenSigningOptions,
  );
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 300000,
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 3.154e10,
  });
  res.send('login successfull');
};
