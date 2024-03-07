// import configs from "../../config/default"
// import redis from "../../config/redis"
import TABLE from '../models';
import { typeUser } from '../models/User';
import { HttpError } from '../util/HttpError';

export type insertUser = Pick<typeUser, 'display_name' | 'email' | 'password_hash'>;
type patchUser = Pick<
    typeUser,
    'active' | 'description' | 'display_name' | 'image_url' | 'password_hash' | 'profile_complete' | 'role'
>;

class UserRepository {
    async getByEmail(email: string) {
        return await TABLE.USER.query().findOne({ email });
    }

    async getById(id: string) {
        const user = await TABLE.USER.query().findById(id);
        if (!user) throw new HttpError(404, 'user not found');
        return user;
    }

    async insert(userData: insertUser) {
        return await TABLE.USER.query().insert(userData);
    }
    //split into diffrent functions
    async patch(id: string, data: Partial<patchUser>) {
        return await TABLE.USER.query().patchAndFetchById(id, data);
    }
}

export default UserRepository;
