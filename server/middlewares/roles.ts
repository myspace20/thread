import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { HttpError } from '../util/HttpError';

async function admin(req: Request, res: Response, next: NextFunction) {
  const user = req.user;

  if (!user || user.role !== 'admin') {
    return next(new HttpError(403, 'Access Restricted'));
  }

  next();
}

export { admin };
