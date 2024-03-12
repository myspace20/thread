import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

async function authorization(req: Request, res: Response, next: NextFunction) {
    const userService = new UserService();
    const user = res.locals.user;
    // console.log(user)
    if (!user) {
        return res.status(401).send('unauthorized');
    }
    const result = await userService.getById(user.userId);
    console.log(result);
    if (result.active != true && result.profile_complete != true) {
        return res.status(401).send('please complete your profile');
    }
    next();
}

export default authorization;
