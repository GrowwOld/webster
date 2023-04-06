import aes from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

export { default as Utf8Encoder } from 'crypto-js/enc-utf8';
export { default as Base64Encoder } from 'crypto-js/enc-base64';
export { default as NoPadding } from 'crypto-js/pad-nopadding';
export { default as sha256Hash } from 'crypto-js/sha256';

import { ResponseType, CipherOptionType } from './types';

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
export const encryptAes = (dataToEncrypt: object | string, ENCODE: string) => {

  const response: ResponseType = {
    data: null,
    error: null
  };

  try {
    const ciphertext = aes.encrypt(JSON.stringify(dataToEncrypt), ENCODE);

    response.data = ciphertext.toString();

    return response;

  } catch (e: any) {
    response.error = e.message;
    return response;
  }

};


/**
 * Encrypt
 *
 * @remarks
 * This method is used by encryption service .
 *
 * @param dataToEncrypt - The data that needs to be encrypted in AES
 * @param ENCODE - The key used for encrytping the data.
 * @param cipherOptions - The options for encrypting the data using aes algorithm.
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

export const encryptAesBase64 = (dataToEncrypt: string, ENCODE: string | CryptoJS.lib.WordArray, cipherOptions: CipherOptionType) => {

  const response: ResponseType = {
    data: null,
    error: null
  };

  try {
    const ciphertext = aes.encrypt(dataToEncrypt, ENCODE, cipherOptions).ciphertext.toString(Base64);

    response.data = ciphertext;

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

export const decryptAes = (ciphertext: string | null, ENCODE: string) => {

  const response: ResponseType = {
    data: null,
    error: null
  };

  try {
    if (ciphertext === null) {
      response.error = 'Cannot decrypt null object';
      return response;
    }

    const bytes = aes.decrypt(ciphertext.toString(), ENCODE);

    const decryptedData = JSON.parse(bytes.toString(Utf8));

    response.data = decryptedData;
    return response;

  } catch (e: any) {
    response.error = e.message;
    return response;
  }
};
