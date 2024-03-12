import express from 'express';
import { handlerWrapper } from '../util';
import { allTagsGet, createTagPost, deleteTag, editTag } from '../handlers/tags';
import authorization from '../middlewares/authorization';

const router = express.Router();

router.get('/tags', handlerWrapper(allTagsGet));

router.post('/tags', handlerWrapper(createTagPost));

router.patch('/tags/:id', handlerWrapper(editTag));

router.delete('/tags/:id', handlerWrapper(deleteTag));

export default router;
