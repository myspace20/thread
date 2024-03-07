import { Request, Response } from 'express';
import UserService from '../../services/UserService';

export const createUserAccount = async (req: Request, res: Response) => {
    const userService = new UserService();
    const email = await userService.signUp(req.body);
    res.send(email);
};

export const userVerifyAccount = async (req: Request, res: Response) => {
    const userService = new UserService();
    console.log(req.params.token);
    await userService.verifyUserAccount(req.params.token);
    res.send('account verified successfully');
};

export const requestUserPasswordReset = async (req: Request, res: Response) => {
    const userService = new UserService();
    const passwordResetRequest = await userService.requestUserPasswordReset(req.body.email);
    res.send(passwordResetRequest);
};

export const resetUserPassword = async (req: Request, res: Response) => {
    const userService = new UserService();
    const passwordReset = await userService.resetUserPassword(req.body.password, req.params.token);
    res.send(passwordReset);
};
