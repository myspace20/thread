import { Model, ModelObject } from 'objection';
import User from './User';
import Tag from './Tag';
import Post from './Post';
import Comment from './Comment';
import Vote from './Vote';

export default class Thread extends Model {
  id: string;
  title: string;
  text: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  static get tableName() {
    return 'threads';
  }

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'users.id',
        to: 'threads.user_id',
      },
    },
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: Tag,
      join: {
        from: 'threads.id',
        through: {
          from: 'thread_tags.thread_id',
          to: 'thread_tags.tag_id',
        },
        to: 'tags.id',
      },
    },
    posts: {
      relation: Model.HasManyRelation,
      modelClass: Post,
      join: {
        from: 'posts.thread_id',
        to: 'threads.id',
      },
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: 'posts.id',
        to: 'comments.thread_id',
      },
    },
    votes: {
      relation: Model.HasManyRelation,
      modelClass: Vote,
      join: {
        from: 'votes.thread_id',
        to: 'threads.id',
      },
    },
  };
}

export type ThreadShape = ModelObject<Thread>;
