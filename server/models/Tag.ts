import { Model, ModelObject } from 'objection';

export default class Tag extends Model {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;

    static get tableName() {
        return 'tags';
    }
}

export type TagShape = ModelObject<Tag>;
