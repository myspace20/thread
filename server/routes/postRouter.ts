import express from 'express';
import { handlerWrapper } from '../util';
import { createPost, deletePost, editPost, setPostAsAccepted } from '../handlers/post';

const router = express.Router();

router.post('/posts/:thread_id', handlerWrapper(createPost));

router.patch('/posts/:id/threads/:thread_id', handlerWrapper(editPost));

router.patch('/posts/:id/threads/:thread_id/set_accepted', handlerWrapper(setPostAsAccepted));

router.delete('/posts/:post_id/threads/:thread_id', handlerWrapper(deletePost));

export default router;
