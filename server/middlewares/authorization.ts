import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

async function authorization(req: Request, res: Response, next: NextFunction) {
  const { refreshToken, accessToken } = req.cookies;

  if (!refreshToken && !accessToken) {
    return res.status(401).send('access restricted, no token passed');
  }
  const userService = new UserService();
  const user = req.user.userId;
  if (!user) {
    return res.status(401).send('unauthorized');
  }
  const result = await userService.getById(user);
  if (!result) {
    return res.status(401).send('unauthorized');
  }
  if (result.active != true && result.profile_complete != true) {
    return res.status(401).send('please complete your profile');
  }
  next();
}

export default authorization;
