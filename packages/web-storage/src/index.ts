import cookie from 'js-cookie';

import localStorageInstance from './core';

import { BUCKETS, DEFAULT_STORAGE_EXPIRY_TIME, STORAGE_TYPE } from './constants';

import { checkForErrors, getBucketNameFromKey, getFullKeyForItem, isEmpty } from './helpers';


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

export function getDataFromStorage(key: string, storageType: string, bucket = BUCKETS.OTHERS): string | Object | null {
  const bucketKey = getFullKeyForItem(key, bucket);

  if (checkForErrors() || !localStorageInstance.supported()) {
    return null;
  }

  if (storageType === STORAGE_TYPE.LOCAL_STORAGE) {
    const result = localStorageInstance.get(bucketKey);

    return result;

  } else if (storageType === STORAGE_TYPE.SESSION_STORAGE) {
    const result = sessionStorage.getItem(key);

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

export function setDataToStorage(key : string, data : any, storageType: string, expiresInMin ?: number, bucket = BUCKETS.OTHERS) {
  if (typeof expiresInMin === 'undefined' || expiresInMin == null) {
    expiresInMin = DEFAULT_STORAGE_EXPIRY_TIME;
  }

  const bucketKey = getFullKeyForItem(key, bucket);

  const expiresInDay = ((expiresInMin / 60) / 24);

  if (checkForErrors() || !localStorageInstance.supported()) {
    return '';
  }

  if (STORAGE_TYPE.COOKIE === storageType) {
    cookie.set(key, data, { expires: expiresInDay, path: '/', secure: true });

  } else if (STORAGE_TYPE.SESSION_STORAGE === storageType) {
    sessionStorage.setItem(key, data);

  } else if (STORAGE_TYPE.LOCAL_COOKIE_STORAGE === storageType) {
    localStorageInstance.set(bucketKey, data, expiresInMin);
    cookie.set(key, data, { expires: expiresInDay, path: '/', secure: true });

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
    sessionStorage.removeItem(key);

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
  sessionStorage.clear();
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
  sessionStorage.clear();
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
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index) || '';

    if (getBucketNameFromKey(key) === bucket) {
      clearKeyFromStorage(key, STORAGE_TYPE.LOCAL_STORAGE);
    }
  }
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
export const errorInStorage = checkForErrors;
