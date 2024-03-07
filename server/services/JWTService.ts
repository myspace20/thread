import JWTTools, { JwtPayload, Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

export class JWTService {
    static sign(payload: JwtPayload, key: Secret, options: SignOptions) {
        return JWTTools.sign(payload, key, options);
    }

    static verify(token: string, key: Secret, options: VerifyOptions) {
        try {
            const decoded = JWTTools.verify(token, key, options);
            return { decoded, expired: false };
        } catch (e) {
            return { decoded: null, expired: true };
        }
    }
}
