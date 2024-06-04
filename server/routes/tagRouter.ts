import express from 'express';
import { handlerWrapper } from '../util';
import {
  allTagsGet,
  createTagPost,
  deleteTag,
  editTag,
} from '../handlers/tags';
import authorization from '../middlewares/authorization';
import { admin } from '../middlewares/roles';

const router = express.Router();

router.get('/tags', authorization, handlerWrapper(allTagsGet));

router.post('/tags', authorization, admin, handlerWrapper(createTagPost));

router.patch('/tags/:id', authorization, admin, handlerWrapper(editTag));

router.delete('/tags/:id', authorization, admin, handlerWrapper(deleteTag));

export default router;
