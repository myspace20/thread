import express from 'express';
import { handlerWrapper } from '../util';
import { authLoginPost } from '../handlers/auth';
import {
  createUserAccount,
  requestUserPasswordReset,
  resetUserPassword,
  updateUserprofileAndActivateUser,
  userVerifyAccount,
} from '../handlers/user';
import upload from '../util/uploads';

const router = express.Router();

router.post('/sign_up', handlerWrapper(createUserAccount));

router.post('/login', handlerWrapper(authLoginPost));

router.get('/auth/verify/:token', handlerWrapper(userVerifyAccount));

router.post('/request_reset', handlerWrapper(requestUserPasswordReset));

router.post('/reset/:token', handlerWrapper(resetUserPassword));

router.patch(
  '/complete_profile',
  upload.single('avatar'),
  handlerWrapper(updateUserprofileAndActivateUser),
);

export default router;
