import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errorHandler } from './util';
import helmet from 'helmet';
import { mailQueue } from '../config/queue';
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const app: Application = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
    queues: [new BullMQAdapter(mailQueue)],
    serverAdapter,
});

app.use('/ui', serverAdapter.getRouter());

app.use(routes);

app.use(errorHandler);

app.get('*', (req: Request, res: Response) => {
    res.send('version 1.0.0');
});

export default app;
