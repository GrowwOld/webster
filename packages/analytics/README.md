# web-analytics 
 [![npm version](https://img.shields.io/npm/v/@groww-tech/web-analytics?color=51C838)](https://www.npmjs.com/package/@groww-tech/web-analytics) 
 [![minzipped size](https://img.shields.io/bundlephobia/minzip/@groww-tech/web-analytics)](https://bundlephobia.com/package/@groww-tech/web-analytics)
 ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Groww/webster/analytics.yml?color=51C838)

<br/>

Analytics service exposes methods to send events to 3rd party analytics tools like Webengage and Gtm


### Installation

```
npm i @groww-tech/analytics
```

### API

Analytics has a pretty straight forward API usage.

```
import { trackEvent } from '@groww-tech/analytics';

trackEvent('Dev', 'PageView');      //PageView event with Dev category is sent to both webengage and gtm when this method is used
```

📚[Complete API Documentation](https://groww.github.io/webster/)

## License

Analytics is licensed under a [MIT License](./LICENSE).

<br/>

*This package is customized for use in Groww projects. Use at your own risk.*

<br/>

---