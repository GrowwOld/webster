# web-storage 
 [![npm version](https://img.shields.io/npm/v/@groww-tech/ella?color=51C838)](https://www.npmjs.com/package/@groww-tech/ella) 
 [![minzipped size](https://img.shields.io/bundlephobia/minzip/@groww-tech/ella)](https://bundlephobia.com/package/@groww-tech/ella)
 ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Groww/webster/Ella_Build?color=51C838)

<br/>

Web storage is a storage service that provides simple APIs to get/set data to Local Storage and Cookies. Support for further browser storage is coming soon.

### Installation

```
npm i @groww-tech/web-storage
```

### API

Web Storage has a pretty straight forward API usage.

```
import { getDataFromStorage, STORAGE_TYPE } from '@groww-tech/web-storage';

console.log(getDataFromStorage('sdjhfsjdgfd', STORAGE_TYPE.LOCAL_STORAGE)); // Output - Data corresponding to the key provided will be return from local storage
```

## License

Web Storage is licensed under a [MIT License](./LICENSE).
