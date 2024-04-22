import cookie from 'js-cookie';

import { isEmpty } from '@groww-tech/ella';

import localStorageInstance from './instances/localStorage';
import sessionStorageInstance from './instances/sessionStorage';

import {
  BUCKETS,
  BUCKET_SEPERATOR,
  DEFAULT_STORAGE_EXPIRY_TIME,
  MAXIMUM_EXPIRY_LIMIT,
  STORAGE_TYPE
} from './constants';

import {
  checkForErrors,
  getBucketNameFromKey,
  getFullKeyForItem,
  getUserProvidedKeyFromStoredKey
} from './helpers';


/**
 * Get Data from Storage
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param key - The Key corresponding to which data is to be extracted.
 * @param storageType - `{ default: "localStorage" }` The type of storage you want to
 * extract data from.
 * @param {string} [bucket='OTHERS'] - `{ default: "OTHERS" }` The bucket in which you want to store data.
 * We have persisted, auth and others
 *
 * @returns The Data stored in Storage if any, else null.
 *
 */

// we are exporting type as any becuase exported type can be null, object or string. If we dont specify
// any then we have to handle too much on our client side.

// Default bucket is others because we dont want to let anyone store data in persisted bucket or auth bucket
// until explicitly specified.
export function getDataFromStorage(key: string, storageType: string, bucket = BUCKETS.OTHERS): any {
  if (checkForErrors() || !localStorageInstance.supported()) {
    return null;
  }

  const bucketKey = getFullKeyForItem(key, bucket);

  if (storageType === STORAGE_TYPE.LOCAL_STORAGE) {
    const result = localStorageInstance.get(bucketKey);

    return result;

  } else if (storageType === STORAGE_TYPE.SESSION_STORAGE) {
    const result = sessionStorageInstance.get(key);

    return result;

  } else if (storageType === STORAGE_TYPE.COOKIE) {

    const result = cookie.get(key) || '';

    return result;

  } else if (storageType === STORAGE_TYPE.LOCAL_COOKIE_STORAGE) {
    let result = localStorageInstance.get(bucketKey);

    if (isEmpty(result)) {
      result = cookie.get(key);
    }

    return result;
  }

  return null;
}

/**
 * Set Data to Storage
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param key - The Key corresponding to which data is to be stored.
 * @param data - The Key corresponding to which data is to be extracted.
 * @param storageType - `{ default: "localStorage" }` The type of storage you want to
 * store data to.
 * @param {string}[expiresInMin] - For How long in minutes should we store data. Default is one week.
 * @param {string} [bucket='OTHERS'] - `{ default: "OTHERS" }` The bucket in which you want to store data.
 * We have persisted, auth and others
 * @returns void.
 *
 */

export function setDataToStorage(key : string, data : any, storageType: string, expiresInMin = DEFAULT_STORAGE_EXPIRY_TIME, bucket = BUCKETS.OTHERS) {
  if (checkForErrors() || !localStorageInstance.supported()) {
    return '';
  }

  // we dont allow more than 14 days of storage for others bucket. If more than 14 days is stored, we make it to 14 days.
  if ((expiresInMin > MAXIMUM_EXPIRY_LIMIT) && (bucket === BUCKETS.OTHERS)) {
    expiresInMin = MAXIMUM_EXPIRY_LIMIT;
  }

  const bucketKey = getFullKeyForItem(key, bucket);

  const expiresInDay = ((expiresInMin / 60) / 24);


  if (STORAGE_TYPE.COOKIE === storageType) {
    cookie.set(key, data, { expires: expiresInDay, path: '/', secure: true });

  } else if (STORAGE_TYPE.SESSION_STORAGE === storageType) {
    sessionStorageInstance.set(key, data);

  } else if (STORAGE_TYPE.LOCAL_COOKIE_STORAGE === storageType) {
    localStorageInstance.set(bucketKey, data, expiresInMin);
    cookie.set(key, data, { expires: expiresInDay, path: '/', secure: true });

  } else {
    localStorageInstance.set(bucketKey, data, expiresInMin);
  }
}
export function setDataToStorageStrict(key : string, data : any, storageType: string, expiresInMin = DEFAULT_STORAGE_EXPIRY_TIME, bucket = BUCKETS.OTHERS) {
  if (checkForErrors() || !localStorageInstance.supported()) {
    return '';
  }

  // we dont allow more than 14 days of storage for others bucket. If more than 14 days is stored, we make it to 14 days.
  if ((expiresInMin > MAXIMUM_EXPIRY_LIMIT) && (bucket === BUCKETS.OTHERS)) {
    expiresInMin = MAXIMUM_EXPIRY_LIMIT;
  }

  const bucketKey = getFullKeyForItem(key, bucket);

  const expiresInDay = ((expiresInMin / 60) / 24);


  if (STORAGE_TYPE.COOKIE === storageType) {
    cookie.set(key, data, { expires: expiresInDay, path: '/', secure: true, sameSite:'Strict' });

  } else if (STORAGE_TYPE.SESSION_STORAGE === storageType) {
    sessionStorageInstance.set(key, data);

  } else if (STORAGE_TYPE.LOCAL_COOKIE_STORAGE === storageType) {
    localStorageInstance.set(bucketKey, data, expiresInMin);
    cookie.set(key, data, { expires: expiresInDay, path: '/', secure: true, sameSite:'Strict' });

  } else {
    localStorageInstance.set(bucketKey, data, expiresInMin);
  }
}

/**
 * Clear Particular Key from Storage
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param key - The Key corresponding to which data is to be extracted.
 * @param storageType - `{ default: "localStorage" }` The type of storage you want to
 * clear data from.
 *
 * @returns void.
 *
 */

export function clearKeyFromStorage(key: string, storageType: string, bucket = BUCKETS.OTHERS): void {
  const bucketKey = getFullKeyForItem(key, bucket);

  if (storageType === STORAGE_TYPE.COOKIE) {
    cookie.remove(key, { path: '/' });

  } else if (storageType === STORAGE_TYPE.SESSION_STORAGE) {
    sessionStorageInstance.remove(key);

  } else if (storageType === STORAGE_TYPE.LOCAL_COOKIE_STORAGE) {
    cookie.remove(key, { path: '/' });
    localStorageInstance.remove(bucketKey);

  } else {
    localStorageInstance.remove(bucketKey);
  }
}

/**
 * Clears the type of storage specified;
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param storageType - `{ default: "localStorage" }` The type of storage you want to
 * clear data from.
 *
 * @returns void.
 *
 */

export function clearStorage(storageType: string) {
  if (storageType === STORAGE_TYPE.SESSION_STORAGE) {
    clearStorageSession();

  } else if (storageType === STORAGE_TYPE.COOKIE) {
    clearStorageCookies();

  } else if (storageType === STORAGE_TYPE.LOCAL_COOKIE_STORAGE) {
    clearStorageLS();
    clearStorageCookies();

  } else {
    clearStorageLS();
  }
}


/**
 * Clears the Local Storage based on the original exported method i.e; clearStorage();
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @returns void
 *
 * @internal
 *
 */

function clearStorageLS() {
  clearBucketStorage(BUCKETS.AUTH);
  clearBucketStorage(BUCKETS.OTHERS);
  clearRogueKeys();
}

/**
 * Clears the Session Storage based on the original exported method i.e; clearStorage();
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @returns void
 *
 * @internal
 *
 */

function clearStorageSession() {
  sessionStorageInstance.clear();
}

/**
 * Clears the Cookie Storage based on the original exported method i.e; clearStorage();
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @returns void
 *
 * @internal
 *
 */

function clearStorageCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const spcook = cookies[ i ].split('=');

    clearKeyFromStorage(spcook[ 0 ].trim(), STORAGE_TYPE.COOKIE);
  }
}

/**
 * Clears a Bucket for Local Storage.
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param bucket - the that we want to clear
 *
 * @returns void
 *
 *
 */

export function clearBucketStorage(bucket: string) {
  const localStorageLength = localStorage.length;

  // PLEASE NOTE:-
  //
  // we are keeping reverse array because everytime if() is true, the original array gets altered
  // and the keys move 1 index up. For example:- If LS length is initial 10 and iterator is at 0.
  // If we remove the first key, LS length becomes 9 and iterator will be at 1. The key that will be
  // initial at index 1 will be moving to index 0 now. And since the iterator is at 1, index 0 will not be deleted.
  // this is why we are keeping the loop backwards startin from length - 1;
  //
  for (let index = localStorageLength - 1; index >= 0; index--) {
    const key = localStorage.key(index) || '';
    const userKey = getUserProvidedKeyFromStoredKey(key);

    // we want to extract bucket name from original stored key.
    // and remove the keys only that stores values not expiration time.
    // they will automatically be cleared after the original key is removed.
    if (getBucketNameFromKey(key) === bucket && !userKey.includes('-exptime')) {
      clearKeyFromStorage(userKey, STORAGE_TYPE.LOCAL_STORAGE, bucket);
    }
  }
}

/**
 * Clear Extra Keys that are not using the storage library.
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 *
 * @returns void
 * @internal
 *
 */

function clearRogueKeys() {
  const localStorageLength = localStorage.length;

  // PLEASE NOTE:-
  //
  // we are keeping reverse array because everytime if() is true, the original array gets altered
  // and the keys move 1 index up. For example:- If LS length is initial 10 and iterator is at 0.
  // If we remove the first key, LS length becomes 9 and iterator will be at 1. The key that will be
  // initial at index 1 will be moving to index 0 now. And since the iterator is at 1, index 0 will not be deleted.
  // this is why we are keeping the loop backwards startin from length - 1;
  //
  for (let index = localStorageLength - 1; index >= 0; index--) {
    const key = localStorage.key(index) || '';

    if (!key.includes(BUCKET_SEPERATOR)) {
      localStorage.removeItem(key);
    }
  }
}

/**
 * Enables or Disable Local Storage console.error messages
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param enable - whether we want to enable
 *
 * @returns void
 *
 *
 */

export function enableLocalStorageWarning(enable: boolean) {
  localStorageInstance.enableWarnings(enable);
}

/**
 * Enables or Disable Session Storage console.error messages
 *
 * @remarks
 * This method is a part of our Storage Library.
 *
 * @param enable - whether we want to enable
 *
 * @returns void
 *
 *
 */

export function enableSessionStorageWarning(enable: boolean) {
  sessionStorageInstance.enableWarnings(enable);
}

/**
 * Reexports the constants from our constants file.
 *
 * @remarks
 * These are a part of our Storage Library.
 *
 *
 *
 */

export const BUCKETS_AVAILABLE = BUCKETS;
export const STORAGE_TYPE_AVAILABLE = STORAGE_TYPE;
export const errorInStorage = checkForErrors; //this is a healthcheck that we are exporting.
