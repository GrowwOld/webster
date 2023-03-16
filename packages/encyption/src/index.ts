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

  } catch (error: any) {

    response.error = error.message;
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

  } catch (error: any) {
    response.error = error.message;
    return response;
  }
};
