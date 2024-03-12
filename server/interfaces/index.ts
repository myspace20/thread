import { PostShape } from '../models/Post';
import { ThreadShape } from '../models/Thread';
import { typeUser } from '../models/User';

//USER
type User = typeUser;
export type userId = string;
export type createUser = Pick<User, 'email' | 'display_name' | 'password_hash'>;
export type userProfile = Required<Pick<User, 'description' | 'image_url'>>;
export type userPassword = Pick<User, 'password_hash'>;
export type activateUser = Pick<User, 'active' | 'profile_complete'>;

//POST
type Post = PostShape;
type postId = Pick<Post, 'id'>;
type createPost = Pick<Post, 'text' | 'user_id' | 'thread_id'>;
type updatePost = Pick<Post, 'text'>;
type setPostAsAccepted = Pick<Post, 'thread_id' | 'id'>;

//THREAD
type Thread = ThreadShape;
type threadId = Pick<Thread, 'id'>;
type createThread = Pick<Thread, 'text' | 'title' | 'user_id'>;
type updateThread = Pick<Thread, 'text' | 'title'>;
