import { NextFunction, Request, Response } from 'express';
import configs from '../../config/default';
import { JWTService } from '../services/JWTService';
import { SessionService } from '../services/SessionService';
import { UserService } from '../services/UserService';
import { HttpError } from '../util/HttpError';

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const { accessToken, refreshToken } = req.cookies;

    const { decoded, expired } = JWTService.verify(
        accessToken,
        configs.keys.accessTokenPublicKey,
        configs.accessTokenVerifyOptions,
    );

    if (decoded) {
        res.locals.user = decoded;
    }

    if (expired && refreshToken) {
        const { decoded } = JWTService.verify(
            refreshToken,
            configs.keys.refreshTokenPublicKey,
            configs.refreshTokenVerifyOptions,
        );
        if (!decoded) {
            throw new HttpError(422, 'invalid token');
        }
        //@ts-ignore
        const sessionId = decoded.id;
        const session = await SessionService.findSessionById(sessionId);
        const user = await UserService.getUserById(session.user_id);
        // if(!session && user){}--action for token reuse
        const newAccessToken = JWTService.sign(
            { sessionId: session.id, userId: user.id },
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
            res.locals.user = decodedAcessToken;
        }
    }

    next();
}
