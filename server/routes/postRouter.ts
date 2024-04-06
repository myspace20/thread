import express from 'express';
import { handlerWrapper } from '../util';
import { createPost, deletePost, editPost, setPostAsAccepted } from '../handlers/post';
import authorization from '../middlewares/authorization';

const router = express.Router();

router.post('/posts/:thread_id', authorization, handlerWrapper(createPost));

router.patch('/posts/:id/threads/:thread_id', authorization, handlerWrapper(editPost));

router.patch(
  '/posts/:id/threads/:thread_id/set_accepted',
  authorization,
  handlerWrapper(setPostAsAccepted),
);

router.delete('/posts/:post_id/threads/:thread_id', authorization, handlerWrapper(deletePost));

export default router;
