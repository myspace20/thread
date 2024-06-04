import express from 'express';
import { handlerWrapper } from '../util';
import { castPostVote, castThreadVote } from '../handlers/vote';
import authorization from '../middlewares/authorization';

const router = express.Router();

router.post(
  '/vote/threads/:thread_id',
  authorization,
  handlerWrapper(castThreadVote),
);

router.post(
  '/vote/posts/:post_id',
  authorization,
  handlerWrapper(castPostVote),
);

export default router;
