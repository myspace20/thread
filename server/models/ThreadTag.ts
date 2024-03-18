import { Model } from 'objection';

export default class ThreadTag extends Model {
  static get tableName() {
    return 'thread_tags';
  }
}
