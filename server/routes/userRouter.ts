import express from 'express';
import { handlerWrapper } from '../util';
import { createUserAccount } from '../handlers/user';

const router = express.Router();

router.get('/');

export default router;
