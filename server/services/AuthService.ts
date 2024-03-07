import TABLE from '../models';
import UserRepository from '../repositories/UserRepository';
import { HttpError } from '../util/HttpError';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
// import { sendMail, signUpHtmlContent } from "../util"
// import redis from "../../config/redis"
// import configs from "../../config/default"
import { typeAuth } from '../models/Auth';
// import redis from "../../config/redis"
import { typeUser } from '../models/User';

type password = { password: string };
type authLogin = Pick<typeUser, 'email'> & password;

export default class AuthService {
    async login(loginCredentials: authLogin) {
        const userRepository = new UserRepository();
        const user = await userRepository.getByEmail(loginCredentials.email);
        if (!user) throw new HttpError(409, 'invalid email or password');
        if (!user.active) throw new HttpError(401, 'account email not verified, please verify your account');
        const passwordMatch = await bcrypt.compare(loginCredentials.password, user.password_hash);
        if (!passwordMatch) throw new HttpError(409, 'invalid email or password');
        const authSession: typeAuth = await TABLE.AUTH.query().insert({ user_id: user.id });
        return { authSessionID: authSession.id, userID: user.id };
    }
}
