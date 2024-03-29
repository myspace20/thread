import { NextFunction, Request, Response } from 'express';
import configs from '../../config/default';
import { JWTService } from '../services/JWTService';
import { JwtPayload } from 'jsonwebtoken';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const { refreshToken, accessToken } = req.cookies;
    const { decoded, expired } = JWTService.verify(
        accessToken,
        configs.keys.accessTokenPublicKey,
        configs.accessTokenVerifyOptions,
    );

    console.log(accessToken, expired);

    if (decoded) {
        res.locals.user = decoded;
    }

    if (expired && refreshToken) {
        const { decoded } = JWTService.verify(
            refreshToken,
            configs.keys.refreshTokenPrivateKey,
            configs.refreshTokenVerifyOptions,
        ) as JwtPayload;
        const newAccessToken = JWTService.sign(
            { sessionId: decoded.sessionId, userId: decoded.userId },
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
