import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errorHandler } from './util';
import helmet from 'helmet';
import { mailQueue } from './workers/email';
import { deserializeUser } from './middlewares/deserializeUser';
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
import cookieParser from 'cookie-parser';
import { http_request_counter, http_request_duration_milliseconds } from './util/metrics';
import { logger } from './util/logger';
import responseTime from 'response-time';
// import swaggerjsdoc from "swagger-jsdoc"
// import swaggerUi from "swagger-ui-express"

// const options = {
//   definition:{
//     openapi:"3.1.0",
//     severs:[
//       {
//         url:"http://localhost:8080"
//       }
//     ],
//     info:{
//       title:"thread-api",
//       version:"1.0.1"
//     }
//   },
//   apis:["/home/roger/Downloads/thread-api-final/thread-api-final/server/routes/authRouter.ts"],

// }

const app: Application = express();

// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public/uploads`));

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
  queues: [new BullMQAdapter(mailQueue)],
  serverAdapter,
});

app.use('/ui', serverAdapter.getRouter());

// app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerjsdoc(options)))

app.use(deserializeUser);

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
  // Increment the HTTP request counter
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
