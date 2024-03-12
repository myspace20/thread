import JWTTools, { JwtPayload, Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

export class JWTService {
    static sign(payload: JwtPayload, key: string, options: Object) {
        return JWTTools.sign(payload, key, options);
    }

    static verify(token: string, key: string, options: Object) {
        try {
            const decoded = JWTTools.verify(token, key, options);
            return { decoded, expired: false };
        } catch (e) {
            return { decoded: null, expired: true };
        }
    }
}
