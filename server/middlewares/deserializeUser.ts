import { NextFunction, Request, Response } from 'express';
import configs from '../../config/default';
import { JWTService } from '../services/JWTService';
import { HttpError } from '../util/HttpError';
import { JwtPayload } from 'jsonwebtoken';

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken } = req.cookies;

  const { decoded } = JWTService.verify(
    accessToken,
    configs.keys.accessTokenPublicKey,
    configs.accessTokenVerifyOptions,
  );

  if (decoded) {
    req.user = decoded;
  }

  next();
}

export async function refreshUserToken(req: Request, res: Response, next: NextFunction) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(new HttpError(403, 'No token passed, access restricted'));
  }

  const { decoded, expired } = JWTService.verify(
    refreshToken,
    configs.keys.accessTokenPublicKey,
    configs.accessTokenVerifyOptions,
  ) as JwtPayload;

  if (expired) {
    return next(new HttpError(403, 'Token expired'));
  }

  const accessToken = JWTService.sign(
    decoded,
    configs.keys.accessTokenPrivateKey,
    configs.accessTokenSigningOptions,
  );
  const newRefreshToken = JWTService.sign(
    decoded,
    configs.keys.refreshTokenPrivateKey,
    configs.refreshTokenSigningOptions,
  );

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 300000,
    secure: true,
  });
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    maxAge: 3.154e10,
    secure: true,
  });

  next();
}
