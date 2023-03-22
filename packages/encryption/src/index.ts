import aes from 'crypto-js/aes';
import cryptoJS from 'crypto-js/enc-utf8';

import { ResponseType } from './types';

/**
 * Encrypt
 *
 * @remarks
 * This method is a part of our Encryption Service.
 *
 * @param object - The data that needs to be encrypted in AES
 * @param secretKey - The key used for encrytping the data.
 *
 * @returns The object with keys of data and error.
 *
 * @example
 * ```
 * encryptAes('Data to encrypt','secret-key')); => Output will be
 * {
 *  data:'##Some random ciphered text',
 *  error:null
 * }.
 * ```
 */

export const encryptAes = (dataToEncrypt: object | string, secretKey: string) => {

  const response: ResponseType = {
    data: null,
    error: null
  };

  try {
    const ciphertext = aes.encrypt(JSON.stringify(dataToEncrypt), secretKey);

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
 * @param object - The encrypted data (in AES) that needs to be decrypted
 * @param secretKey - The key used for decrypting the data.
 *
 * @returns The object with keys of data and error.
 *
 *  @example
 * ```
 * decryptAes('##Some randome ciphered data','secret-key'))
 * Output will be
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

export const decryptAes = (ciphertext: string | null, secretKey: string) => {

  const response: ResponseType = {
    data: null,
    error: null
  };

  try {
    if (ciphertext === null) {
      response.error = 'Cannot decrypt null object';
      return response;
    }

    const bytes = aes.decrypt(ciphertext.toString(), secretKey);

    const decryptedData = JSON.parse(bytes.toString(cryptoJS));

    response.data = decryptedData;
    return response;

  } catch (e: any) {
    response.error = e.message;
    return response;
  }
};
