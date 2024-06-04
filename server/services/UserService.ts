import configs from '../../config/default';
import UserRepository from '../repositories/UserRepository';
import { HttpError } from '../util/HttpError';
import { v4 as uuidv4 } from 'uuid';
import redisClientInit from '../infra/others/redis';
import { passwordResetContent, sendMail, signUpHtmlContent } from '../util';
import {
  createUser,
  userId,
  userQuery,
  userToken,
  userUpdate,
} from '../interfaces';
import HashService from './HashService';

class UserService {
  private userRepository = new UserRepository();
  private hashService = new HashService();

  async getById(id: string) {
    return await this.userRepository.getById(id);
  }

  async signUp(signUpCredentials: createUser) {
    const redis = await redisClientInit();
    const registrationId = uuidv4();

    const user = await this.userRepository.getByEmail(signUpCredentials.email);
    if (user) throw new HttpError(409, 'User account exists, please log in');
    const passwordHash = await this.hashService.createHash(
      signUpCredentials.password,
    );

    const userDetails = {
      email: signUpCredentials.email,
      password_hash: passwordHash,
      display_name: signUpCredentials.display_name,
    };

    await redis.hSet(registrationId, userDetails);
    redis.expire(registrationId, 2 * 24 * 60 * 60);

    const html = signUpHtmlContent(registrationId);
    const mailData = {
      to: signUpCredentials.email,
      from: configs.mail.registrationMail,
      subject: 'Account verification email',
      html,
    };

    await sendMail('email', mailData, {
      attempts: 10,
      backoff: 5000,
    });

    return 'Account verification email sent, please check your mail';
  }

  async verifyUserAccount(token: userToken) {
    const redis = await redisClientInit();
    const result = await redis.hGetAll(token);
    if (Object.keys(result).length === 0)
      throw new HttpError(400, 'Verification link expired');
    const userData = JSON.stringify(result);
    const parsedUserData = JSON.parse(userData);
    const user = await this.userRepository.createNewUser(parsedUserData);
    await redis.del(token);
    return user;
  }

  async requestUserPasswordReset(email: string) {
    const redis = await redisClientInit();
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new HttpError(404, 'User not found');
    const resetID = uuidv4();
    const userId = user.id;
    await redis.set(resetID, userId);
    redis.expire(resetID, 2 * 24 * 60 * 60);
    const html = passwordResetContent(resetID);
    const mailData = {
      to: user.email,
      from: configs.mail.supportMail,
      subject: 'Password Reset',
      html,
    };
    sendMail('email', mailData, {
      attempts: 10,
      backoff: 5000,
    });
    return 'Password reset email sent, check your inbox';
  }

  async resetUserPassword(password: string, token: userToken) {
    const redis = await redisClientInit();
    const result = await redis.get(token);
    if (result === null)
      throw new HttpError(404, 'Invalid password reset link');
    await this.userRepository.getById(result);
    const hashService = new HashService();
    const password_hash = await hashService.createHash(password);
    await this.userRepository.patch(result, {
      password: password_hash,
    });
    await redis.del(token);
    return 'Password reset successfull';
  }

  async activateUser(id: userId, data: userUpdate) {
    const user = await this.userRepository.getById(id);
    await this.userRepository.patch(user.id, data);
    return 'User activated successfully';
  }

  async updateProfile(id: userId, data: userUpdate) {
    const user = await this.userRepository.getById(id);
    await this.userRepository.patch(user.id, data);
    return 'Profile updated successfully';
  }
}

export default UserService;
