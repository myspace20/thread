import UserRepository from '../repositories/UserRepository';
import { HttpError } from '../util/HttpError';
import bcrypt from 'bcrypt';
import AuthRepository from '../repositories/AuthRepository';
import { authId, login } from '../interfaces';
import HashService from './HashService';

export default class AuthService {
  private userRepository = new UserRepository();
  private hashService = new HashService();

  async getById(id: authId) {
    const authRepository = new AuthRepository();
    return await authRepository.getById(id);
  }

  async login(loginCredentials: login) {
    const user = await this.userRepository.getByEmail(loginCredentials.email);
    if (!user) {
      throw new HttpError(409, 'invalid email or password');
    }
    const passwordMatch = this.hashService.verifyHash(
      loginCredentials.password,
      user.password_hash,
    );
    if (!passwordMatch) {
      throw new HttpError(409, 'invalid email or password');
    }
    return {
      userId: user.id,
      role: user.role,
      isActive: user.active,
      profileComplete: user.profile_complete,
    };
  }
}
