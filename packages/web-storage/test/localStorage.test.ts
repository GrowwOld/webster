import { expect, describe, it } from 'vitest';

import * as storage from '../src';

describe('Local Storage Tests', () => {

/**
 * We are checking if data is being set to local storage properly.
 *
 * 1. We are first checking if there is any errorInStorage.
 * 2. Setting Data to Storage.
 * 3. If it doesn't falls under catch block, ideally data is setted.
 *
 */

  it('Add Data to LS', () => {
    const key = 'storageLibTest';
    const value = key;
    let testResult = false;

    if (!storage.errorInStorage()) {
      try {
        storage.setDataToStorage(key, value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10);
        testResult = true;

      } catch {
        testResult = false;
      }
    }

    expect(testResult).toBe(true);
  });

/**
 * We are checking if data is get from local storage properly.
 *
 * 1. We are first checking if there is any errorInStorage.
 * 2. Setting Data to Storage.
 * 3. Getting data from Storage and checking if the value is same. In this case only we mark the test passed.
 *
 */

  it('Get Data from LS', () => {
    const key = 'storageLibTest';
    const value = key;
    let testResult = false;

    if (!storage.errorInStorage()) {
      try {
        storage.setDataToStorage(key, value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10);
        const result = storage.getDataFromStorage(key, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE);

        if (result === value) {
          testResult = true;
        }

      } catch {
        testResult = false;
      }
    }


    expect(testResult).toBe(true);
  });


/**
 * We are checking if key is being removed from local storage.
 *
 * 1. We are first checking if there is any errorInStorage.
 * 2. Setting Data to Storage.
 * 3. Clearing the Key from LS.
 * 4. Getting data from LS using that key. If we didn't get any data test is successful.
 *
 */

  it('Remove Key from LS', () => {
    const key = 'storageLibTest';
    const value = key;
    let testResult = false;

    if (!storage.errorInStorage()) {
      try {
        storage.setDataToStorage(key, value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10);
        storage.clearKeyFromStorage(key, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE);

        const result = storage.getDataFromStorage(key, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE);

        if (!result) {
          testResult = true;
        }

      } catch {
        testResult = false;
      }
    }

    expect(testResult).toBe(true);
  });

/**
 * We are checking if a particular bucket is being cleared.
 *
 * 1. Check if any error in Storage.
 * 2. Adding 2 items to PERISTED Bucket.
 * 3. Adding 4 items to AUTH Bucket.
 * 4. Clearing the AUTH Bucket.
 * 5. Trying to get a key from AUTH bucket using key added. If no data is returned, test is successful.
 *
 */

  it('Clear a particular bucket', () => {
    let testResult = false;

    if (!storage.errorInStorage()) {
      const value = 'sdfsdvd';

      try {
        storage.setDataToStorage('key1', value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.PERSISTED);
        storage.setDataToStorage('key2', value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.PERSISTED);

        storage.setDataToStorage('key1', value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.AUTH);
        storage.setDataToStorage('key2', value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.AUTH);
        storage.setDataToStorage('key3', value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.AUTH);
        storage.setDataToStorage('key4', value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.AUTH);
        storage.setDataToStorage('key5', value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.AUTH);
        storage.setDataToStorage('key6', value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.AUTH);
        storage.setDataToStorage('key7', value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.AUTH);
        storage.setDataToStorage('key8', value, storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.AUTH);

        storage.clearBucketStorage(storage.BUCKETS_AVAILABLE.AUTH);
        const data1 = storage.getDataFromStorage('key1', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, storage.BUCKETS_AVAILABLE.AUTH);
        const data2 = storage.getDataFromStorage('key2', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, storage.BUCKETS_AVAILABLE.AUTH);
        const data3 = storage.getDataFromStorage('key3', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, storage.BUCKETS_AVAILABLE.AUTH);
        const data4 = storage.getDataFromStorage('key4', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, storage.BUCKETS_AVAILABLE.AUTH);
        const data5 = storage.getDataFromStorage('key5', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, storage.BUCKETS_AVAILABLE.AUTH);
        const data6 = storage.getDataFromStorage('key6', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, storage.BUCKETS_AVAILABLE.AUTH);

        const isDataPresent = data1 || data2 || data3 || data4 || data5 || data6;

        if (!(isDataPresent)) {
          testResult = true;
        }

      } catch {
        testResult = false;
      }

    }

    expect(testResult).toBe(true);
  });

/**
 * We are checking if a particular storage type is being cleared. In case of LS, Persisted bucket should not be cleared.
 *
 * 1. We are first checking if there is any errorInStorage.
 * 2. Setting 1 Persisted Value, 2 AUTH, 2 OTHERS values.
 * 3. Clearing the Local Storage.
 * 4. Getting a value from each bucket.
 * 5. If Auth and Others bucket returns a null value and Persisted bucket returns the original value, our test case is successful.
 *
 */

  it('Clear Storage', () => {
    let testResult = false;

    if (!storage.errorInStorage()) {
      try {
        storage.setDataToStorage('key1', 'PERSISTED_VALUE', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.PERSISTED);

        storage.setDataToStorage('key1', 'value', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.AUTH);
        storage.setDataToStorage('key2', 'value', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.AUTH);

        storage.setDataToStorage('key1', 'value', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.OTHERS);
        storage.setDataToStorage('key2', 'value', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, 10, storage.BUCKETS_AVAILABLE.OTHERS);

        storage.clearStorage(storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE);

        const authBucketValue = storage.getDataFromStorage('key1', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, storage.BUCKETS_AVAILABLE.AUTH);
        const othersBucketValue = storage.getDataFromStorage('key1', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, storage.BUCKETS_AVAILABLE.OTHERS);
        const persistedBucketValue = storage.getDataFromStorage('key1', storage.STORAGE_TYPE_AVAILABLE.LOCAL_STORAGE, storage.BUCKETS_AVAILABLE.PERSISTED);

        if (!authBucketValue && !othersBucketValue && (persistedBucketValue === 'PERSISTED_VALUE')) {
          testResult = true;
        }

      } catch {
        testResult = false;
      }
    }

    expect(testResult).toBe(true);
  });
});
