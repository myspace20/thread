import express from 'express';
import { handlerWrapper } from '../util';
import { castPostVote, castThreadVote } from '../handlers/vote';

const router = express.Router();

router.post('/vote/threads/:thread_id', handlerWrapper(castThreadVote));

router.post('/vote/posts/:post_id', handlerWrapper(castPostVote));

export default router;
