import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errorHandler, handlerWrapper } from './util';
import helmet from 'helmet';
import { mailQueue } from './workers/email';
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
import cookieParser from 'cookie-parser';
import { http_request_counter, http_request_duration_milliseconds } from './util/metrics';
import responseTime from 'response-time';
import { HttpError } from './util/HttpError';
import { logger } from './util/logger';
import authorization from './middlewares/authorization';
import { admin } from './middlewares/roles';

const app: Application = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

// app.use(
//   handlerWrapper((req:Request, _res:Response, next:NextFunction) => {
//     if (
//       req.method === 'POST' ||
//       req.method === 'PATCH' ||
//       req.method === 'PUT'
//     ) {
//       if (req.headers['content-type'] !== 'application/json') {
//         logger.fatal(`Invalid request from ${req.ip}`)
//         throw new HttpError(
//           415,
//           'Invalid content type. API only supports application/json',
//         );
//       }
//     }
//     next();
//   }),
// );

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

app.use('/bull_dashboard', authorization, admin, serverAdapter.getRouter());

app.use('/api/v1', routes);

app.use(
  responseTime(function (req, res, time) {
    http_request_duration_milliseconds
      .labels({
        method: req.method,
        route: req.url,
        code: res.statusCode,
      })
      .observe(time);
  }),
);

app.use(function (req, res, next) {
  http_request_counter
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
  res.send('version 1.0.0');
});

export default app;
