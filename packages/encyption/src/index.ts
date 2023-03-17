import aes from 'crypto-js/aes';
import cryptoJS from 'crypto-js/enc-utf8';

import { ResponseType } from './types';

/**
 * Encrypt
 *
 * @remarks
 * This method is a part of our Encryption Service.
 *
 * @param object - The data that needs to be encrypted
 * @param secretKey - The key used for encrytping the data.
 *
 * @returns The object with keys of data and error.
 *
 * @example
 * Here's an example how to encrypt api:
 * ```
 * console.log(encrypt('Data to encrypt','secret-key')); => Output will be 
 * {
 *  data:'##Some random ciphered text',
 *  error:null
 * }.
 * ```
 */

export const encrypt = (object:object, secretKey:string) => {

  const response:ResponseType = {
    data: null,
    error: null
  };

  try {
    const ciphertext = aes.encrypt(JSON.stringify(object), secretKey);

    response.data = ciphertext.toString();

    return response;

  } catch (e: any) {

    response.error = e.message;
    return response;
  }

};

/**
 * Decrypt
 *
 * @remarks
 * This method is a part of our Encryption Service.
 *
 * @param object - The encrypted data that needs to be decrypted
 * @param secretKey - The key used for decrypting the data.
 *
 * @returns The object with keys of data and error.
 * 
 *  @example
 * Here's an example how to decrypt api:
 * ```
 * console.log(decrypt('##Some randome ciphered data','secret-key')); => Output will be 
 * {
 *  data:'The original data that was encrypted',
 *  error:null
 * }.
 * 
 * Note: if in any case there was error in encrytping/decrypting the error key will be populated and data key will be null 
 * like
 * {
 *  data:null,
 *  error:'Some error message'
 * }
 * ```
 *
 */

export const decrypt = (ciphertext: string, secretKey: string) => {

  const response: ResponseType = {
    data: null,
    error: null
  };

  try {

    const bytes = aes.decrypt(ciphertext.toString(), secretKey);

    const decryptedData = JSON.parse(bytes.toString(cryptoJS));

    response.data = decryptedData;
    return response;

  } catch (e: any) {
    response.error = e.message;
    return response;
  }
};
