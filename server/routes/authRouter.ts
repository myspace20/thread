import express from 'express';
import { handlerWrapper } from '../util';
import { authLoginPost, logoutHandler, refreshTokenHandler } from '../handlers/auth';
import {
  activateUser,
  createUserAccount,
  requestUserPasswordReset,
  resetUserPassword,
  updateProfile,
  userVerifyAccount,
} from '../handlers/user';
import upload from '../util/uploads';

const router = express.Router();

router.post('/auth/register', handlerWrapper(createUserAccount));

router.post('/auth/login', handlerWrapper(authLoginPost));

router.delete('/auth/logout', handlerWrapper(logoutHandler));

router.post('/auth/refresh_token', handlerWrapper(refreshTokenHandler));

router.get('/auth/email/verify/:token', handlerWrapper(userVerifyAccount));

router.post('/auth/password/request_reset', handlerWrapper(requestUserPasswordReset));

router.post('/auth/password/reset/:token', handlerWrapper(resetUserPassword));

router.patch('/complete_profile', upload.single('avatar'), handlerWrapper(activateUser));

router.patch('/update_profile', upload.single('avatar'), handlerWrapper(updateProfile));

export default router;
