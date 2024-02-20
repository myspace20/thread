import { Model } from "objection";

export default class Tag extends Model{
    static get tableName(){
        return 'tags'
    }
}