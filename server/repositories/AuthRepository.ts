import TABLE from '../models';
import { HttpError } from '../util/HttpError';
import { typeAuth } from '../models/Auth';
import { userId } from '../interfaces';

type authInsert = Pick<typeAuth, 'user_id'>;

class AuthRepository {
    async getById(id: string) {
        const authSession = await TABLE.AUTH.query().findById(id);
        if (!authSession) throw new HttpError(404, 'session not found');
        return authSession;
    }

    async create(id: userId) {
        return await TABLE.AUTH.query().insert({ user_id: id, valid: true });
    }

    async patch(id: string) {
        return await TABLE.AUTH.query().patchAndFetchById(id, { valid: false });
    }

    async delete(id: string) {
        await TABLE.AUTH.query().deleteById(id);
        return 'auth session deleted successfully';
    }
}

export default AuthRepository;
