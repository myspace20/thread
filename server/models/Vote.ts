import { Model } from "objection";

export default class Vote extends Model {
    static get tableName() {
        return 'votes'
    }
}