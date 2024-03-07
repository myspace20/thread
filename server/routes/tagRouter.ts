import express from 'express';
import { handlerWrapper } from '../util';
import { createTagPost, deleteTag, editTag } from '../handlers/tags';

const router = express.Router();

router.post('/tags', handlerWrapper(createTagPost));

router.patch('/tags/:id', handlerWrapper(editTag));

router.delete('/tags/:id', handlerWrapper(deleteTag));

export default router;
