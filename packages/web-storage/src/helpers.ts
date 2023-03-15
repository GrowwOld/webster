import cookie from 'js-cookie';

import localStorageInstance from './core';

import { BUCKET_SEPERATOR, BUCKET_UNAVAILABLE_ERROR } from './constants';

/**
 * Get Full Key for an Item that is to be Stored.
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param key - Key which is passed from frontend.
 * @param bucket - Bucket where data is to be stored.
 *
 * @returns a plain key that seperates bucket and initial key provided by a seperator.
 *
 * @example
 * Here's an example how key is generated:
 * ```
 * console.log(getFullKeyForItem('kjsdfgkj','PERSISTED')); => Output will be 'PERSISTED$$%&kjsdfgkj'
 * ```
 *
 * @internal
 */


export const getFullKeyForItem = (key: string, bucket: string): string => {
  return `${bucket} + ${BUCKET_SEPERATOR} + ${key}`;
};

/**
 * Get Bucket Name of a key
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param key - Key which was finally generated to store data.
 *
 * @returns bucket name.
 *
 * @example
 * Here's an example how bucket name is returned
 * ```
 * console.log(getBucketNameFromKey('PERSISTED$$%&kjsdfgkj')); => Output will be 'PERISTED'
 * ```
 * ```
 * console.log(getBucketNameFromKey('someKeyNotHavingOurSeperator')); => Output will be 'No Bucket Associated!'.
 * ```
 * @internal
 */

export const getBucketNameFromKey = (key: string): string => {
  if (key.includes(BUCKET_SEPERATOR)) {
    return key.split(BUCKET_SEPERATOR)[0];

  } else {
    return BUCKET_UNAVAILABLE_ERROR;
  }
};

/**
 * Get User Provided Key from our Stored Key
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param key - Key which was finally generated to store data.
 *
 * @returns user provided key.
 *
 * @example
 * Here's an example how user key is returned
 * ```
 * console.log(getUserKeyFromStoredKey('PERSISTED$$%&kjsdfgkj')); => Output will be 'kjsdfgkj'
 * ```
 * ```
 * console.log(getUserKeyFromStoredKey('someKeyNotHavingOurSeperator')); => Output will be 'someKeyNotHavingOurSeperator'.
 * ```
 * @internal
 */

export const getUserKeyFromStoredKey = (key: string): string => {
  if (key.includes(BUCKET_SEPERATOR)) {
    return key.split(BUCKET_SEPERATOR)[1];

  } else {
    return key;
  }
};


/**
 * Gets a Particular Bucket Size in Local Storage
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param bucket - Bucket where data is to be stored.
 *
 * @returns Bucket Size in KB.
 * @example
 * Here's an example how user key is returned
 * ```
 * console.log(calculateBucketSizeInLocalStorage('PERSISTED')); => Output will be '40.00'
 * ```
 * @internal
 *
 */

export const calculateBucketSizeInLocalStorage = (bucket: string) : string | null => {
  if (typeof (Storage) !== 'undefined') {
    let data = '';

    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index) || '';

      if (getBucketNameFromKey(key) === bucket) {
        const value = localStorageInstance.get(key);

        data += (key + value);
      }
    }

    const localStorageSpaceInKB = ((data.length * 16) / (8 * 1024)).toFixed(2);

    return localStorageSpaceInKB;

  } else {
    return null;
  }
};

/**
 * Check if there are any issues in the storage services available.
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @returns {boolean} based on if there are errors or not.
 * @example
 * Here's an example how user key is returned
 * ```
 * console.log(calculateBucketSizeInLocalStorage('PERSISTED')); => Output will be '40.00'
 * ```
 * @internal
 *
 */
export const checkForErrors = (): boolean => {
  if (typeof localStorage === 'undefined' || localStorage == null ||
    typeof sessionStorage === 'undefined' || sessionStorage == null ||
    typeof cookie === 'undefined' || cookie == null) {
    return true;  // means there are errors ... dont proceed
  }

  return false;
};

/**
 * This method can be used to check if the variable is empty or not. Returns true if it is empty else false.
 *
 * @param {any} data - Any variable that you want to check if it is empty or not
 *
 * @example
 * ```
 * if(isEmpty(userData)) {
 *   return;
 * }
 * ```
 */

export function isEmpty(data: any) {
  if (data === null || data === undefined || typeof data === 'undefined') {
    return true;
  }

  const dataType = typeof data;

  switch (dataType) {

    case 'string':
      if (data.trim() === '' || data === 'null' || data === null) {
        return true;
      }

      return false;

    case 'object':
      const keys = Object.keys(data);
      const len = keys.length;

      if (len <= 0) {
        return true;
      }

      return false;

    case 'number':
      return false;

    default:
        // for array
      if (Array.isArray(data) && data.length <= 0) {
        return true;
      }

      return false;
  }

}