import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

export const httpRequestCounter = new client.Counter({
  name: 'thread_api_http_request_count',
  help: 'Count of HTTP requests made to ',
  labelNames: ['method', 'route', 'statusCode'],
});
register.registerMetric(httpRequestCounter);

export const httpRequestsInMilliSeconds = new client.Histogram({
  name: 'thread_api_http_request_duration_milliseconds',
  help: 'Duration of HTTP requests in milliseconds.',
  labelNames: ['method', 'route', 'code'],
});

register.registerMetric(httpRequestsInMilliSeconds);

export const sigupCounter = new client.Counter({
  name: 'thread_api_user_signup_count',
  help: 'Count of user signups',
  labelNames: ['method', 'route', 'code'],
});

register.registerMetric(sigupCounter);

export const threadCounter = new client.Counter({
  name: 'thread_api_thread_count',
  help: 'Count of threads created',
  labelNames: ['method', 'route', 'code'],
});

register.registerMetric(threadCounter);

export default register;
