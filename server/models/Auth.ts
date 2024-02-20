import { Model } from "objection";
import { User } from "./User";

export default class Auth extends Model{
    static get tableName(){
        return 'auth'
    }

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'auth.user_id',
                to: 'users.id'
            }
        }
    };
}