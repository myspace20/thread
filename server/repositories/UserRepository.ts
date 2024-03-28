import { createUser, userId, userQuery } from '../interfaces';
import TABLE from '../models';
import { HttpError } from '../util/HttpError';

class UserRepository {
  async getByEmail(email: userQuery) {
    return await TABLE.USER.query().findOne(email);
  }

  async getById(id: userId) {
    const user = await TABLE.USER.query().findById(id);
    if (!user) throw new HttpError(404, 'user not found');
    return user;
  }

  async createNewUser(userData: createUser) {
    return await TABLE.USER.query().insert(userData);
  }

  async patch(id: userId, query: userQuery) {
    return await TABLE.USER.query().patchAndFetchById(id, query);
  }
}

export default UserRepository;
