import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

export const http_request_counter = new client.Counter({
  name: 'myapp_http_request_count',
  help: 'Count of HTTP requests made to my app',
  labelNames: ['method', 'route', 'statusCode'],
});
register.registerMetric(http_request_counter);

export const http_request_duration_milliseconds = new client.Histogram({
  name: 'myapp_http_request_duration_milliseconds',
  help: 'Duration of HTTP requests in milliseconds.',
  labelNames: ['method', 'route', 'code'],
});
register.registerMetric(http_request_duration_milliseconds);

export default register;
