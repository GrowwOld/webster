/* eslint-disable no-console */
import express, { Request, Response } from 'express';

import promClient from 'prom-client';

const prometheusApp = express();

const ROUTE = process.env.ROUTE || '/metrics';
const PORT = process.env.PORT || 8001;


/**
 * A registry to manage metrics
 */
const register = new promClient.Registry();

/**
 * Collect the default metrics that prometheus gives
 */
promClient.collectDefaultMetrics({
  labels: { app: 'node-application-monitoring-app' },
  prefix: 'node_',
  register
});

/**
 * A histogram for request details which is counted based on bucket values.
 */
const httpRequestTimer = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: [ 'method', 'route', 'code' ],
  buckets: [ 0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10 ]
});

/**
 * Register the histogram into the registry, The registry provides a set of APIs that can be used to interact with histogram metrics.
*/
register.registerMetric(httpRequestTimer);


/**
* Expose '/metrics' route for promethues to monitor
*/
prometheusApp.get(ROUTE, async (req: Request, res: Response) => {
  // Start the HTTP request timer, saving a reference to the returned method
  const end = httpRequestTimer.startTimer();

  // Save reference to the path so we can record it when ending the timer
  const route = req.route.path;

  res.setHeader('Content-Type', register.contentType);

  // Whatever the metrics scraped by prometheus will get emitted using register.metrics()
  res.send(await register.metrics());

  // End timer and add labels
  end({ route, code: res.statusCode, method: req.method });
});


prometheusApp.listen(PORT, () => {
  console.log(`Prometheus is running on port ${PORT}`);
});