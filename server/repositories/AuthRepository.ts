import TABLE from '../models';
import { HttpError } from '../util/HttpError';
import { authId, userId } from '../interfaces';

class AuthRepository {
  async getById(id: authId) {
    const authSession = await TABLE.AUTH.query().findById(id);
    if (!authSession) throw new HttpError(404, 'session not found');
    return authSession;
  }

  async create(id: userId) {
    return await TABLE.AUTH.query().insert({
      user_id: id,
      valid: true,
    });
  }

  async patch(id: authId) {
    return await TABLE.AUTH.query().patchAndFetchById(id, {
      valid: false,
    });
  }

  async delete(id: authId) {
    await TABLE.AUTH.query().deleteById(id);
    return 'auth session deleted successfully';
  }
}

export default AuthRepository;
