import { Model, ModelObject } from 'objection';
import User from './User';

export default class Comment extends Model {
    id: string;
    text: string;
    user_id: string;
    thread_id?: string;
    post_id?: string;
    created_at?: Date;
    updated_at?: Date;

    static get tableName() {
        return 'comments';
    }

    static relationMapping = {
        author: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'users.id',
                to: 'comments.user_id',
            },
        },
    };
}

export type commentShape = ModelObject<Comment>;
