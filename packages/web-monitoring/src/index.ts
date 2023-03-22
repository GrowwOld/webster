/* eslint-disable no-console */
import express from 'express';

/* Code to expose metrics for Prometheus starts */
import client from 'prom-client';

const prometheusApp = express();


// Registering the prom client
const register = new client.Registry();

// Default metrics that prometheus gives
/**
 * collectDefaultMetrics takes 1 options object
 * labels -> labels to all default metrics
 * prefix -> an optional prefix for metric names
 * register -> a registry to which metrics should be registered
 */
client.collectDefaultMetrics({
  labels: { app: 'node-application-monitoring-app' },
  prefix: 'node_',
  register
});

// Create a custom histogram metric
const httpRequestTimer = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: [ 'method', 'route', 'code' ],
  buckets: [ 0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10 ] // 0.1 to 10 seconds
});

// Register the histogram
register.registerMetric(httpRequestTimer);


// Prometheus metrics route
prometheusApp.get('/metrics', async (req, res) => {
  // Start the HTTP request timer, saving a reference to the returned method
  const end = httpRequestTimer.startTimer();
  // Save reference to the path so we can record it when ending the timer
  const route = req.route.path;

  res.setHeader('Content-Type', register.contentType);
  //Jo bhi metrics Prometheus ne scrape kari hai, voh idhar se emit hogi
  res.send(await register.metrics());

  // End timer and add labels
  end({ route, code: res.statusCode, method: req.method });
});

/**
 * This function is used to initialize the prometheus server for monitoring
 * @param PROMETHEUS_PORT Port on which prometheus app will listen
 */
export const initPrometheus = (PROMETHEUS_PORT: number) => {
  prometheusApp.listen(PROMETHEUS_PORT, () => {
    console.log(`Prometheus is running on port ${PROMETHEUS_PORT}`);
  });
};

/* Code to expose metrics for Prometheus ends */
