import express from 'express';
import { handlerWrapper } from '../util';
import { deleteThread, editThread, threadPost, threadsGet } from '../handlers/thread';

const router = express.Router();

router.post('/threads', handlerWrapper(threadPost));

router.get('/threads', handlerWrapper(threadsGet));

router.patch('/threads/:id', handlerWrapper(editThread));

router.delete('/threads/:id', handlerWrapper(deleteThread));

export default router;
