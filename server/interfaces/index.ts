import { PostShape } from '../models/Post';
import { ThreadShape } from '../models/Thread';
import { typeUser } from '../models/User';

//USER
type User = typeUser;
type userId = Pick<User, 'id'>;
type createUser = Pick<User, 'email' | 'display_name' | 'password_hash'>;
type userProfile = Required<Pick<User, 'description' | 'image_url'>>;
type userPassword = Pick<User, 'password_hash'>;

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
