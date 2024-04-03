import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { HttpError } from '../util/HttpError';

async function authorization(req: Request, res: Response, next: NextFunction) {
  const userService = new UserService();

  const user = req.user;

  if (!user) {
    return next(new HttpError(401, 'unauthorized request'));
  }

  if (user) {
    const loggedInUser = await userService.getById(user.userId);

    if (!loggedInUser.active && !loggedInUser.profile_complete) {
      return next(
        new HttpError(403, 'Please finish setting up your account by completing your profile'),
      );
    }
  }

  next();
}

export default authorization;
