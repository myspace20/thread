import UserRepository from '../repositories/UserRepository';
import { HttpError } from '../util/HttpError';
import bcrypt from 'bcrypt';
import AuthRepository from '../repositories/AuthRepository';
import { authId, login } from '../interfaces';

export default class AuthService {
  async getById(id: authId) {
    const authRepository = new AuthRepository();
    return await authRepository.getById(id);
  }

  async login(loginCredentials: login) {
    const userRepository = new UserRepository();
    const authRepository = new AuthRepository();
    const user = await userRepository.getByEmail({
      email: loginCredentials.email,
    });
    console.log(user);
    if (!user) throw new HttpError(409, 'invalid email or password');
    if (!user.active)
      throw new HttpError(401, 'account email not verified, please verify your account');
    const passwordMatch = await bcrypt.compare(loginCredentials.password, user.password_hash);
    if (!passwordMatch) throw new HttpError(409, 'invalid email or password');
    const authSession = await authRepository.create(user.id);
    return { sessionId: authSession.id, userId: user.id };
  }
}
