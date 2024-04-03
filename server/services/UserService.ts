import configs from '../../config/default';
import UserRepository from '../repositories/UserRepository';
import { HttpError } from '../util/HttpError';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { client as redis } from '../../config/redis';
import { passwordResetContent, sendMail, signUpHtmlContent } from '../util';
import { createUser, userId, userQuery, userToken, userUpdate } from '../interfaces';

class UserService {
  private userRepository = new UserRepository();

  async getById(id: string) {
    return await this.userRepository.getById(id);
  }

  async signUp(signUpCredentials: createUser) {
    const registrationID = uuidv4();
    const user = await this.userRepository.getByEmail(signUpCredentials.email);
    if (user) throw new HttpError(409, 'user account exists, please log in');
    const passwordHash = await bcrypt.hash(signUpCredentials.password, 10);
    const userDetails = {
      email: signUpCredentials.email,
      password_hash: passwordHash,
      display_name: signUpCredentials.display_name,
    };
    await redis.hSet(registrationID, userDetails);
    redis.expire(registrationID, 2 * 24 * 60 * 60);
    const html = signUpHtmlContent(registrationID);
    const mailData = {
      to: signUpCredentials.email,
      from: configs.mail.registrationMail,
      subject: 'Account verification email',
      html,
    };
    sendMail('email', mailData, {
      attempts: 10,
      backoff: 5000,
    });
    return 'account verification email sent, please check your mail';
  }

  async verifyUserAccount(token: userToken) {
    const result = await redis.hGetAll(token);
    if (Object.keys(result).length === 0) throw new HttpError(400, 'verification link expired');
    const userData = JSON.stringify(result);
    const parse = JSON.parse(userData);
    const user = await this.userRepository.createNewUser(parse);
    await redis.del(token);
    return user;
  }

  async requestUserPasswordReset(email: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new HttpError(404, 'user not found');
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
    const result = await redis.get(token);
    if (result === null) throw new HttpError(404, 'invalid password reset link');
    await this.userRepository.getById(result);
    const password_hash = await bcrypt.hash(password, 10);
    await this.userRepository.patch(result, {
      password: password_hash,
    });
    await redis.del(token);
    return 'Password reset successfull';
  }

  async updateUserprofileAndActivateUser(id: userId, profileData: userUpdate) {
    const user = await this.userRepository.getById(id);
    const updateData = {
      ...profileData,
      active: true,
      profile_complete: true,
    };
    await this.userRepository.patch(user.id, updateData);
    return 'profile updated successfully';
  }
}

export default UserService;
