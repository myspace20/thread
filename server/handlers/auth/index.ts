import { Request, Response } from 'express';
import AuthService from '../../services/AuthService';

export const authLoginPost = async (req: Request, res: Response) => {
    const authService = new AuthService();
    const user = await authService.login(req.body);
    res.send('login successfull');
};
