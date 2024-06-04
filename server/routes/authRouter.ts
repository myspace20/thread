import express from 'express';
import { handlerWrapper } from '../util';
import {
  authLoginPost,
  logoutHandler,
  refreshTokenHandler,
} from '../handlers/auth';
import {
  activateUser,
  createUserAccount,
  requestUserPasswordReset,
  resetUserPassword,
  updateProfile,
  userVerifyAccount,
} from '../handlers/user';
import upload from '../util/uploads';
import authorization from '../middlewares/authorization';

const router = express.Router();

router.post('/auth/register', handlerWrapper(createUserAccount));

router.post('/auth/login', handlerWrapper(authLoginPost));

router.delete('/auth/logout', handlerWrapper(logoutHandler));

router.get('/auth/refresh_token', handlerWrapper(refreshTokenHandler));

router.get('/auth/email/verify/:token', handlerWrapper(userVerifyAccount));

router.post(
  '/auth/password/request_reset',
  handlerWrapper(requestUserPasswordReset),
);

router.post('/auth/password/reset/:token', handlerWrapper(resetUserPassword));

router.patch(
  '/auth/complete_profile',
  upload.single('avatar'),
  authorization,
  handlerWrapper(activateUser),
);

router.patch(
  '/auth/update_profile',
  upload.single('avatar'),
  authorization,
  handlerWrapper(updateProfile),
);

export default router;
