import express from 'express';
import { handlerWrapper } from '../util';
import {
  createPostComment,
  createThreadComment,
  deleteThreadComment,
  editPostComment,
  editThreadComment,
} from '../handlers/comment';
import authorization from '../middlewares/authorization';

const router = express.Router();

router.post('/comments/threads/:thread_id', authorization, handlerWrapper(createThreadComment));

router.post('/comments/posts/:post_id', authorization, handlerWrapper(createPostComment));

router.patch('/comments/:id/threads/:thread_id', authorization, handlerWrapper(editThreadComment));

router.patch('/comments/:id/posts/:post_id', authorization, handlerWrapper(editPostComment));

router.delete(
  '/comments/:id/threads/:thread_id',
  authorization,
  handlerWrapper(deleteThreadComment),
);

router.delete('/comments/:id/posts/:post_id', authorization, handlerWrapper(deleteThreadComment));

export default router;
