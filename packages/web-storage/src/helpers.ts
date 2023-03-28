import cookie from 'js-cookie';

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
  return bucket + BUCKET_SEPERATOR + key;
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
 * console.log(getUserProvidedKeyFromStoredKey('PERSISTED$$%&kjsdfgkj')); => Output will be 'kjsdfgkj'
 * ```
 * ```
 * console.log(getUserProvidedKeyFromStoredKey('someKeyNotHavingOurSeperator')); => Output will be 'someKeyNotHavingOurSeperator'.
 * ```
 * @internal
 */

export const getUserProvidedKeyFromStoredKey = (key: string): string => {
  if (key.includes(BUCKET_SEPERATOR)) {
    return key.split(BUCKET_SEPERATOR)[1];

  } else {
    return key;
  }
};

/**
 * Check if there are any issues in the storage services available.
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @returns {boolean} based on if there are errors or not.
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
