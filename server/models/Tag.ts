import { Model, ModelObject, QueryBuilder } from 'objection';

export default class Tag extends Model {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  static modifiers = {
    defaultSelects(builder: QueryBuilder<Model>) {
      builder.select('id', 'name', 'description', 'created_at');
    },
  };

  static get tableName() {
    return 'tags';
  }
}

export type TagShape = ModelObject<Tag>;
