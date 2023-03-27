# web-monitoring 
 [![npm version](https://img.shields.io/npm/v/@groww-tech/web-monitoring?color=51C838)](https://www.npmjs.com/package/@groww-tech/web-monitoring) 
 [![minzipped size](https://img.shields.io/bundlephobia/minzip/@groww-tech/web-monitoring)](https://bundlephobia.com/package/@groww-tech/web-monitoring)
 ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Groww/webster/monitoring.yml?color=51C838)

<br/>

Monitoring service which exposes a method to initialize the prometheus server for monitoring.


### Installation

```
npm i @groww-tech/monitoring
```

### API


```
import { initPrometheus } from '@groww-tech/monitoring';

initPrometheus(8001, '/metrics'); // Prometheus server will run on port 8001. Second parameter will be optional, by default it will be '/metrics' route.
```

📚[Complete API Documentation](https://groww.github.io/webster/)

## License

Monitoring service is licensed under a [MIT License](./LICENSE).

<br/>

*This package is customized for use in Groww projects. Use at your own risk.*

<br/>

---
