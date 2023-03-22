import { expect, describe, it } from 'vitest';

import * as storage from '../src';

describe('Session Storage Tests', () => {

    /**
     * We are checking if data is being set to session storage properly.
     *
     * 1. We are first checking if there is any errorInStorage.
     * 2. Setting Data to Storage.
     * 3. If it doesn't falls under catch block, ideally data is setted.
     *
     */

  it('Add Data to Session Storage', () => {
    const key = 'storageLibTest';
    const value = key;
    let testResult = false;

    if (!storage.errorInStorage()) {
      try {
        storage.setDataToStorage(key, value, storage.STORAGE_TYPE_AVAILABLE.SESSION_STORAGE);
        testResult = true;

      } catch {
        testResult = false;
      }
    }

    expect(testResult).toBe(true);
  });


  /**
   * We are checking if data is get from session storage properly.
   *
   * 1. We are first checking if there is any errorInStorage.
   * 2. Setting Data to Storage.
   * 3. Getting data from Storage and checking if the value is same. In this case only we mark the test passed.
   *
   */

  it('Get Data from Session Storage', () => {
    const key = 'storageLibTest';
    const value = key;
    let testResult = false;

    if (!storage.errorInStorage()) {
      try {
        storage.setDataToStorage(key, value, storage.STORAGE_TYPE_AVAILABLE.SESSION_STORAGE, 10);
        const result = storage.getDataFromStorage(key, storage.STORAGE_TYPE_AVAILABLE.SESSION_STORAGE);

        if (result === value) {
          testResult = true;
        }

      } catch {
        testResult = false;
      }
    }


    expect(testResult).toBe(true);
  });

});
