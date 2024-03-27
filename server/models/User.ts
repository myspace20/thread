import { Model, ModelObject } from 'objection';

enum Role {
  'basic',
  'moderator',
  'admin',
}

export default class User extends Model {
  id: string;
  email: string;
  display_name: string;
  password_hash: string;
  active: boolean;
  description?: string;
  image_url?: string;
  role?: Role;
  profile_complete: boolean;
  created_at: Date;
  updated_at: Date;

  static get tableName() {
    return 'users';
  }
}
export type typeUser = ModelObject<User>;
