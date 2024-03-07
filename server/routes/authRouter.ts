import express from 'express';
import { handlerWrapper } from '../util';
import { authLoginPost } from '../handlers/auth';
import { createUserAccount, requestUserPasswordReset, resetUserPassword, userVerifyAccount } from '../handlers/user';

const router = express.Router();

router.post('/sign_up', handlerWrapper(createUserAccount));

router.post('/login', handlerWrapper(authLoginPost));

router.get('/auth/verify/:token', handlerWrapper(userVerifyAccount));

router.post('/request_reset', handlerWrapper(requestUserPasswordReset));

router.post('/reset/:token', handlerWrapper(resetUserPassword));

export default router;
