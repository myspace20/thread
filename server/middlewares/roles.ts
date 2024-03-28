import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

async function admin(req: Request, res: Response, next: NextFunction) {
  const userService = new UserService();
  const user = req.user.userId;
  if (!user) {
    return res.status(401).send('unauthorized');
  }
  const result = await userService.getById(user);
  if (!result) {
    return res.status(401).send('unauthorized');
  }
  if (user.role !== 'admin') {
    return res.status(403).send('access restricted');
  }
  next();
}

export { admin };
