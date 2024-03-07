import { Router } from 'express';

import authRouter from './authRouter';
import commentRouter from './commentRouter';
import postRouter from './postRouter';
import tagRouter from './tagRouter';
import threadRouter from './threadRouter';
import userRouter from './userRouter';
import voteRouter from './voteRouter';

const routes: Router[] = [authRouter, commentRouter, postRouter, tagRouter, threadRouter, userRouter, voteRouter];

export default routes;
