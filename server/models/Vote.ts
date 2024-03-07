import { Model, ModelObject } from 'objection';

//need to change vote to required!!!

export default class Vote extends Model {
    id: string;
    type?: string;
    user_id: string;
    thread_id?: string;
    post_id?: string;
    created_at: Date;
    updated_at: Date;

    static get tableName() {
        return 'votes';
    }
}

export type voteShape = ModelObject<Vote>;
