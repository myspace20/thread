import express from 'express';
import { handlerWrapper } from '../util';
import { deleteThread, editThread, threadPost, threadsGet } from '../handlers/thread';
import authorization from '../middlewares/authorization';

const router = express.Router();

router.post('/threads', handlerWrapper(threadPost));

router.get('/threads', authorization, handlerWrapper(threadsGet));

router.patch('/threads/:id', handlerWrapper(editThread));

router.delete('/threads/:id', handlerWrapper(deleteThread));

export default router;
