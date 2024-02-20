import { Model } from "objection";
import { User } from "./User";


export default class Comment extends Model{
    static get tableName() {
        return "comments";
      }
    
      static relationMapping = {
        author: {
          relation: Model.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: "users.id",
            to: "comments.user_id",
          },
        },
      };
}