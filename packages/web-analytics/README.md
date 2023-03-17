# web-analytics 
 [![npm version](https://img.shields.io/npm/v/@groww-tech/ella?color=51C838)](https://www.npmjs.com/package/@groww-tech/ella) 
 [![minzipped size](https://img.shields.io/bundlephobia/minzip/@groww-tech/ella)](https://bundlephobia.com/package/@groww-tech/ella)
 ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Groww/webster/Ella_Build?color=51C838)

<br/>

Web Analytics is a service used that exposes methods to send events to 3rd party analytics tools like Webengage and Gtm


### Installation

```
npm i @groww-tech/web-analytics
```

### API

Analytics has a pretty straight forward API usage.

```
import { trackEvent } from '@groww-tech/web-analytics';

trackEvent('Dev', 'PageView');      //PageView event with Dev category is sent to both webengage and gtm when this method is used
```

📚[Complete API Documentation](https://groww.github.io/webster/)

## License

Web Analytics is licensed under a [MIT License](./LICENSE).
