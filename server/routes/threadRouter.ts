import express from 'express';
import { handlerWrapper } from '../util';
import {
  deleteThread,
  editThread,
  threadGet,
  threadPost,
  threadsGet,
} from '../handlers/thread';
import authorization from '../middlewares/authorization';

const router = express.Router();

router.post('/threads', authorization, handlerWrapper(threadPost));

router.get('/threads/:id', authorization, handlerWrapper(threadGet));

router.get('/threads', authorization, handlerWrapper(threadsGet));

router.patch('/threads/:id', authorization, handlerWrapper(editThread));

router.delete('/threads/:id', authorization, handlerWrapper(deleteThread));

export default router;
