/* eslint-disable no-console */
import express, { Request, Response } from 'express';

import client from 'prom-client';

import { histogramConfig } from './constants';

const prometheusApp = express();


/**
 * A registry to manage metrics
 */
const register = new client.Registry();

/**
 * Collect the default metrics that prometheus gives
 */
client.collectDefaultMetrics({
  labels: { app: 'node-application-monitoring-app' },
  prefix: 'node_',
  register
});

/**
 * A histogram for request details which is counted based on bucket values.
 */
const httpRequestTimer = new client.Histogram(histogramConfig);

/**
 * Register the histogram into the registry, The registry provides a set of APIs that can be used to interact with histogram metrics.
*/
register.registerMetric(httpRequestTimer);


/**
 * A function to initialize the prometheus service. It will monitor the request duration by storing route, status code and request method of each request.
 * @param PROMETHEUS_PORT Port which prometheus will listen
 * @param routeToExpose Route on which server will expose the metrics
 * @returns void
 */
export function initPrometheus(PROMETHEUS_PORT: number, routeToExpose: string) {
  /**
 * Expose '/metrics' route for promethues to monitor
 */
  prometheusApp.get(routeToExpose, async (req: Request, res: Response) => {
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


  prometheusApp.listen(PROMETHEUS_PORT, () => {
    console.log(`Prometheus is running on port ${PROMETHEUS_PORT}`);
  });
}
