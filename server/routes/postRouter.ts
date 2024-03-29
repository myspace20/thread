import express from 'express';
import { handlerWrapper } from '../util';
import { createPost, deletePost, editPost } from '../handlers/post';

const router = express.Router();

router.post('/posts/:thread_id', handlerWrapper(createPost));

router.patch('/posts/:id/threads/:thread_id', handlerWrapper(editPost));

router.delete('/posts/:post_id/threads/:thread_id', handlerWrapper(deletePost));

export default router;
