//Global

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

// type RequireAtLeastOne<T> = {
//   [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
// }[keyof T]

export type authId = string;

export interface login {
  email: string;
  password: string;
}

//User
export type userId = string;

export type userToken = string;

export type userEmail = string;

export interface createUser {
  email: string;
  password: string;
  display_name: string;
}

export interface userQuery {
  id?: string;
  email?: string;
  display_name?: string;
  active?: boolean;
  role?: string;
  profile_complete?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface userUpdate {
  email?: string;
  password?: string;
  display_name?: string;
  description?: string;
  image_url?: string;
  active?: boolean;
  role?: string;
  profile_complete?: boolean;
}

//Thread

export type threadId = string;

export interface createThread {
  title: string;
  text: string;
  user_id: string;
}

export interface threadQuery {
  id?: string;
  title?: string;
  text?: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface threadUpdate {
  title?: string;
  text?: string;
}

export type tagArray = string[];

//Tags

export type tagId = string;

export interface createTag {
  name: string;
  description: string;
}

export interface tagQuery {
  id?: string;
  name?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface tagUpdate {
  name?: string;
  description?: string;
}

//Posts

export type postId = string;

export interface createPost {
  text: string;
  thread_id: string;
  user_id: string;
}

export interface postQuery {
  id?: string;
  text?: string;
  thread_id?: string;
  user_id?: string;
  is_accepted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface postUpdate {
  text?: string;
  is_accepted?: boolean;
}

//comments

export type commentId = string;

export interface createComment {
  text: string;
  user_id: string;
  post_id?: string;
  thread_id?: string;
}

export interface createThreadComment {
  text: string;
  user_id: string;
  thread_id: string;
}

export interface createPostComment {
  text: string;
  user_id: string;
  post_id: string;
}

export interface commentQuery {
  id?: string;
  text?: string;
  user_id?: string;
  post_id?: string;
  thread_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface commentUpdate {
  text?: string;
}

//Votes

export type voteId = string;

export interface createVote {
  type: string;
  user_id: string;
  thread_id?: string;
  post_id?: string;
}

export interface createThreadVote {
  type: string;
  user_id: string;
  thread_id: string;
}

export interface createPostVote {
  type: string;
  user_id: string;
  post_id: string;
}

export interface voteQuery {
  id?: string;
  type?: string;
  user_id?: string;
  thread_id?: string;
  post_id?: string;
  created_at?: Date;
  updated_at?: Date;
}
