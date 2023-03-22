export const histogramConfig = {
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: [ 'method', 'route', 'code' ],
  buckets: [ 0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10 ]
};
