import { Router } from 'express';
import register from '../util/metrics';

const router = Router();

router.get('/metrics', function (req, res) {
  res.setHeader('Content-Type', register.contentType);
  register.metrics().then((data) => res.status(200).send(data));
});

export default router;
