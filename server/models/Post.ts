import { Model, ModelObject } from 'objection';
import User from './User';
import Comment from './Comment';
import Vote from './Vote';

export default class Post extends Model {
  id: string;
  text: string;
  is_accepted?: boolean;
  thread_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  static get tableName() {
    return 'posts';
  }
  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'users.id',
        to: 'posts.user_id',
      },
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: 'posts.id',
        to: 'comments.post_id',
      },
    },
    votes: {
      relation: Model.HasManyRelation,
      modelClass: Vote,
      join: {
        from: 'votes.post_id',
        to: 'posts.id',
      },
    },
  };
}

export type PostShape = ModelObject<Post>;
