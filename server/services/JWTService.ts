import JWTTools, { JwtPayload, Secret } from 'jsonwebtoken';
import { HttpError } from '../util/HttpError';

export class JWTService {
  static sign(payload: JwtPayload, key: Secret, options: object) {
    return JWTTools.sign(payload, key, options);
  }

  static verify(token: string, key: Secret, options: object) {
    return JWTTools.verify(token, key, options, (err, data) => {
      if (err) {
        throw new HttpError(422, 'verification failed');
      } else {
        return data;
      }
    });
  }
}
