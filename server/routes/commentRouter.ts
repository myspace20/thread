import express from 'express';
import { handlerWrapper } from '../util';
import { createPostComment, createThreadComment, deleteThreadComment, editThreadComment } from '../handlers/comment';

const router = express.Router();

router.post('/comments/threads/:thread_id', handlerWrapper(createThreadComment));

router.post('/comments/posts/:post_id', handlerWrapper(createPostComment));

router.patch('/comments/:id/threads/:thread_id', handlerWrapper(editThreadComment));

router.delete('/comments/:id/threads/:thread_id', handlerWrapper(deleteThreadComment));

router.delete('/comments/:id/posts/:post_id', handlerWrapper(deleteThreadComment));

export default router;
