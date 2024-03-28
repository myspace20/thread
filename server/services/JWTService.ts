import JWTTools, { JwtPayload } from 'jsonwebtoken';

export class JWTService {
  static sign(payload: JwtPayload, key: string, options: object) {
    return JWTTools.sign(payload, key, options);
  }

  static verify(token: string, key: string, options: object) {
    try {
      const decoded = JWTTools.verify(token, key, options);
      return { decoded, expired: false };
    } catch (e) {
      return { decoded: null, expired: true };
    }
  }
}
