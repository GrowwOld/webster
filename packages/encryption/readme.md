# encryption 
 [![npm version](https://img.shields.io/npm/v/@groww-tech/encryption?color=51C838)](https://www.npmjs.com/package/@groww-tech/encryption) 
 [![minzipped size](https://img.shields.io/bundlephobia/minzip/@groww-tech/encryption)](https://bundlephobia.com/package/@groww-tech/encryption)
 ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Groww/webster/encryption.yml?color=51C838)

<br/>

Encryption service as name suggests provides encryption, decryption facility with all major algorithms in trend.


### Installation

```
npm i @groww-tech/encryption
```

### API

Encryption has a pretty straight forward API usage.

```
import { encryptAes } from '@groww-tech/encryption';

console.log(encryptAes('Data to encrypt','secret-key')); // Ouput - { data: 'random string', error:null }
```

## License

Encryption is licensed under a [MIT License](./LICENSE).
