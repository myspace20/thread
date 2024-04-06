import { NextFunction, Request, Response } from 'express';
import config from '../../config/default';
import { HttpError } from '../util/HttpError';
import { JwtPayload } from 'jsonwebtoken';
import { JWTService } from '../services/JWTService';

async function authorization(req: Request, res: Response, next: NextFunction) {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(new HttpError(404, 'Authorization required'));
  }

  const { userId, role, isActive, profileComplete } = JWTService.verify(
    accessToken,
    config.keys.accessTokenPublicKey,
    config.accessTokenVerifyOptions,
  ) as unknown as JwtPayload;

  if ({ userId, role, isActive, profileComplete }) {
    req.user = { userId, role, isActive, profileComplete };
  }

  // if(!isActive && !profileComplete){
  //   return next(new HttpError(401,"Account verification is required"))
  // }

  next();
}

export default authorization;
