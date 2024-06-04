import { Request, Response } from 'express';
import AuthService from '../../services/AuthService';
import { JWTService } from '../../services/JWTService';
import config from '../../../config/default';
import { loginSchema } from './schema';
import { JwtPayload } from 'jsonwebtoken';

export const authLoginPost = async (req: Request, res: Response) => {
  await loginSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const authService = new AuthService();
  const auth = await authService.login(req.body);
  const accessToken = JWTService.sign(
    auth,
    config.keys.accessTokenPrivateKey,
    config.accessTokenSigningOptions,
  );
  const refreshToken = JWTService.sign(
    auth,
    config.keys.refreshTokenPrivateKey,
    config.refreshTokenSigningOptions,
  );
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 300000,
    secure: true,
    // sameSite:"none",
    path: '/',
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 1.44e7,
    secure: true,
    // sameSite:"none",
    path: '/',
  });
  res.send('Login successfull');
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(404).send('No token passed');
  }

  const { userId, role, isActive, profileComplete } = JWTService.verify(
    refreshToken,
    config.keys.refreshTokenPublicKey,
    config.refreshTokenVerifyOptions,
  ) as unknown as JwtPayload;

  const accessToken = JWTService.sign(
    { userId, role, isActive, profileComplete },
    config.keys.accessTokenPrivateKey,
    config.accessTokenSigningOptions,
  );
  const newRefreshToken = JWTService.sign(
    { userId, role, isActive, profileComplete },
    config.keys.refreshTokenPrivateKey,
    config.refreshTokenSigningOptions,
  );

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 300000,
    secure: true,
  });
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    maxAge: 1.44e7,
    secure: true,
  });

  return res.send('Token refresh successfull');
};

export const logoutHandler = async (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(204).send('Log out successfull');
};
