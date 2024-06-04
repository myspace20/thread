import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errorHandler } from './util';
import helmet from 'helmet';
import { mailQueue } from './workers/email';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import cookieParser from 'cookie-parser';
import { httpRequestCounter, httpRequestsInMilliSeconds } from './util/metrics';
import responseTime from 'response-time';
import authorization from './middlewares/authorization';
import { admin } from './middlewares/roles';
import { version } from '../package.json';

const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:3001'],
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public/uploads`));

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/bull_dashboard');

createBullBoard({
  queues: [new BullMQAdapter(mailQueue)],
  serverAdapter,
});

app.use('/bull_dashboard', serverAdapter.getRouter());

app.use('/api/v1', routes);

app.use(
  responseTime(function (req, res, time) {
    httpRequestsInMilliSeconds
      .labels({
        method: req.method,
        route: req.url,
        code: res.statusCode,
      })
      .observe(time);
  }),
);

app.use(function (req, res, next) {
  httpRequestCounter
    .labels({
      method: req.method,
      route: req.originalUrl,
      statusCode: res.statusCode,
    })
    .inc();

  next();
});

app.use(errorHandler);

app.get('*', (req: Request, res: Response) => {
  res.send(`version ${version}`);
});

export default app;
