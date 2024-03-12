import express from 'express';
import { handlerWrapper } from '../util';
import { castThreadVote } from '../handlers/vote';

const router = express.Router();

router.post('/vote/threads/:thread_id', handlerWrapper(castThreadVote));

export default router;
