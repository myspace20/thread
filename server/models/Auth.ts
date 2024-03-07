import { Model, ModelObject } from 'objection';
import User from './User';

export default class Auth extends Model {
    id: string;
    valid: boolean;
    user_id: string;
    created_at: Date;
    updated_at: Date;

    static get tableName() {
        return 'auth';
    }

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'auth.user_id',
                to: 'users.id',
            },
        },
    };
}

export type typeAuth = ModelObject<Auth>;
