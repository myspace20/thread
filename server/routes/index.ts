import { Router } from 'express';

import authRouter from './authRouter';
import commentRouter from './commentRouter';
import postRouter from './postRouter';
import tagRouter from './tagRouter';
import threadRouter from './threadRouter';
import voteRouter from './voteRouter';
import metricRouter from './metrics';

const routes: Router[] = [
  authRouter,
  commentRouter,
  postRouter,
  tagRouter,
  threadRouter,
  voteRouter,
  metricRouter,
];

export default routes;
