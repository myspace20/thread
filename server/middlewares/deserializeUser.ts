import { NextFunction, Request, Response } from 'express';
import configs from '../../config/default';
import { JWTService } from '../services/JWTService';
import { JwtPayload } from 'jsonwebtoken';

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const { refreshToken, accessToken } = req.cookies;

  const { decoded, expired } = JWTService.verify(
    accessToken,
    configs.keys.accessTokenPublicKey,
    configs.accessTokenVerifyOptions,
  );

  if (decoded) {
    req.user = decoded;
  }

  if (expired && refreshToken) {
    const { decoded } = JWTService.verify(
      refreshToken,
      configs.keys.refreshTokenPrivateKey,
      configs.refreshTokenVerifyOptions,
    ) as JwtPayload;

    const newAccessToken = JWTService.sign(
      {
        sessionId: decoded.sessionId,
        userId: decoded.userId,
      },
      configs.keys.accessTokenPrivateKey,
      configs.accessTokenSigningOptions,
    );

    if (newAccessToken) {
      res.cookie('accessToken', newAccessToken, {
        maxAge: 300000,
      });
    }
    const decodedAcessToken = JWTService.verify(
      newAccessToken,
      configs.keys.accessTokenPublicKey,
      configs.accessTokenVerifyOptions,
    );
    if (decodedAcessToken) {
      req.user = decodedAcessToken;
    }
  }

  next();
}
