import { Model, ModelObject } from 'objection';

export default class User extends Model {
  id: string;
  email: string;
  display_name: string;
  password_hash: string;
  active: boolean;
  description?: string;
  image_url?: string;
  role?: string;
  profile_complete: boolean;
  created_at: Date;
  updated_at: Date;

  static get tableName() {
    return 'users';
  }

  static modifiers = {
    profileSelects(builder: any) {
      builder.select('email', 'description', 'description', 'image_url');
    },
    commentAuthor(builder: any) {
      builder.select('display_name');
    },
    authorDetails(builder: any) {
      builder.select('display_name', 'image_url');
    },
  };
}
export type typeUser = ModelObject<User>;
