
/**
 * This File deals with the native local storage methods and exports
 * them with additional functionalities like expiration and better edge case
 * handling
 *
 * @remarks
 * These methods are a part of our Storage Library.
 *
 * @example
 * Here's an example how to use the service:
 * ```
 * console.log(localStorageInstance.set('key','value', 10)); => Output will be true and will be stored till 10 mins.
 * ```
 * ```
 * console.log(localStorageInstance.get('key')); => Output will be 'value' if not expired else null
 * ```
 * @internal
 */

import { clearBucketStorage } from './index';
import { BUCKETS } from './constants';


// Suffix for the key name on the expiration items in localStorage
const CACHE_SUFFIX = '-exptime';

// expiration date radix (set to Base-36 for most space savings)
const EXPIRY_RADIX = 10;

// time resolution in milliseconds
const expiryMilliseconds = 60 * 1000; // 1 minute
// ECMAScript max Date (epoch + 1e8 days)

let cachedJSON : any;
const cacheBucket = '';
let warnings = false;

// Determines if localStorage is supported in the browser;
// result is cached for better performance instead of being run each time.
// Feature detection is based on how Modernizr does it;
// it's not straightforward due to FF4 issues.
// It's not run at parse-time as it takes 200ms in Android.
function supportsStorage() {
  let isStorageSupported: boolean | undefined;

  const key = '__localStorageInstanceTest__';
  const value = key;

  if (isStorageSupported !== undefined) {
    return isStorageSupported;
  }

  // some browsers will throw an error if you try to access local storage (e.g. brave browser)
  // hence check is inside a try/catch
  try {
    if (!localStorage) {
      return false;
    }

  } catch (ex) {
    return false;
  }

  try {
    setItem(key, value);
    removeItem(key);
    isStorageSupported = true;

  } catch (e) {
    // If we hit the limit, and we don't have an empty localStorage then it means we have support
    if (isOutOfSpace(e) && localStorage.length) {
      isStorageSupported = true;
    // just maxed it out and even the set test failed.
    } else {
      isStorageSupported = false;
    }
  }

  return isStorageSupported;
}

// Check to set if the error is us dealing with being out of space
function isOutOfSpace(e: any) {
  return e && (
    e.code === 22 || //everything apart from firefox
    e.code === 1014 || //firefox
    e.name === 'QUOTA_EXCEEDED_ERR' ||
    e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    e.name === 'QuotaExceededError'
  );
}

// Determines if native JSON (de-)serialization is supported in the browser.
function supportsJSON() {
  /*jshint eqnull:true */
  if (cachedJSON === undefined) {
    cachedJSON = (window.JSON != null);
  }

  return cachedJSON;
}

/**
* Returns a string where all RegExp special characters are escaped with a \.
* @param {String} text
* @return {string}
*/
function escapeRegExpSpecialCharacters(text: string): string {
  return text.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
}

/**
* Returns the full string for the localStorage expiration item.
* @param {String} key
* @return {string}
*/
function expirationKey(key: string): string {
  return key + CACHE_SUFFIX;
}

/**
* Returns the number of minutes since the epoch.
* @return {number}
*/
function currentTime(): number {
  return Math.floor((new Date().getTime()) / expiryMilliseconds);
}

/**
* Wrapper functions for localStorage methods
*/

function getItem(key: string) {
  return localStorage.getItem(key);
}


function setItem(key: string, value: any) {
  // Fix for iPad issue - sometimes throws QUOTA_EXCEEDED_ERR on setItem.
  localStorage.removeItem(key);
  localStorage.setItem(key, value);
}


function removeItem(key: string) {
  localStorage.removeItem(key);
}


function eachKey(fn: any) {
  const prefixRegExp = new RegExp('^' + escapeRegExpSpecialCharacters(cacheBucket) + '(.*)');
  // We first identify which keys to process
  const keysToProcess = [];
  let key, i;

  for (i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);
    key = key && key.match(prefixRegExp);
    key = key && key[1];
    if (key && key.indexOf(CACHE_SUFFIX) < 0) {
      keysToProcess.push(key);
    }
  }

  // Then we apply the processing function to each key
  for (i = 0; i < keysToProcess.length; i++) {
    fn(keysToProcess[i], expirationKey(keysToProcess[i]));
  }
}


function flushItem(key: string) {
  const exprKey = expirationKey(key);

  removeItem(key);
  removeItem(exprKey);
}


function flushExpiredItem(key: string) {
  const exprKey = expirationKey(key);
  const expr = getItem(exprKey);

  if (expr) {
    const expirationTime = parseInt(expr, EXPIRY_RADIX);

    // Check if we should actually kick item out of storage
    if (currentTime() >= expirationTime) {
      removeItem(key);
      removeItem(exprKey);
      return true;
    }
  }
}


function warn(message: string, err: any) {
  if (!warnings) return;
  if (!('console' in window) || typeof window.console.warn !== 'function') return;
  window.console.warn('localStorageInstance - ' + message);
  if (err) window.console.warn('localStorageInstance - The error was: ' + err.message);
}

const localStorageInstance = {

  /**
  * Stores the value in localStorage. Expires after specified number of minutes.
  * @param {string} key
  * @param {Object|string} value
  * @param {number} time
  * @return {boolean} whether the value was inserted successfully
  */
  set: function(key: string, value: any, time: number): boolean {
    if (!supportsStorage()) return false;

    // If we don't get a string value, try to stringify
    // In future, localStorage may properly support storing non-strings
    // and this can be removed.

    if (!supportsJSON()) return false;
    try {
      value = JSON.stringify(value);

    } catch (e) {
      // Sometimes we can't stringify due to circular refs
      // in complex objects, so we won't bother storing then.
      return false;
    }

    try {
      setItem(key, value);

    } catch (e) {
      if (isOutOfSpace(e) && localStorage.length > 0) {
        clearBucketStorage(BUCKETS.OTHERS);
        try {
          setItem(key, value);

        } catch {
          // Still not able to add probably becuase the object size is too big.
          warn('Item size larger then LS \'' + key + '\'', e);
          return false;
        }

      } else {
        // If it was some other error, just give up.
        warn('Could not add item with key \'' + key + '\'', e);
        return false;
      }
    }

    // If a time is specified, store expiration info in localStorage
    if (time) {
      setItem(expirationKey(key), (currentTime() + time).toString(EXPIRY_RADIX));

    } else {
      // In case they previously set a time, remove that info from localStorage.
      removeItem(expirationKey(key));
    }

    return true;
  },

  /**
  * Retrieves specified value from localStorage, if not expired.
  * @param {string} key
  * @return {string|Object}
  */
  get: function(key: string) {
    if (!supportsStorage()) return null;

    // Return the de-serialized item if not expired
    if (flushExpiredItem(key)) { return null; }

    // Tries to de-serialize stored value if its an object, and returns the normal value otherwise.
    const value = getItem(key);

    if (!value || !supportsJSON()) {
      return value;
    }

    try {
      // We can't tell if its JSON or a string, so we try to parse
      return JSON.parse(value);

    } catch (e) {
      // If we can't parse, it's probably because it isn't an object
      return value;
    }
  },

  /**
  * Removes a value from localStorage.
  * Equivalent to 'delete' in memcache, but that's a keyword in JS.
  * @param {string} key
  */
  remove: function(key: string) {
    if (!supportsStorage()) return;

    flushItem(key);
  },

  /**
  * Returns whether local storage is supported.
  * Currently exposed for testing purposes.
  * @return {boolean}
  */
  supported: function() {
    return supportsStorage();
  },

  /**
  * Flushes all lscache items and expiry markers without affecting rest of localStorage
  */
  flush: function() {
    if (!supportsStorage()) return;

    eachKey(function(key: string) {
      flushItem(key);
    });
  },

  /**
  * Flushes expired lscache items and expiry markers without affecting rest of localStorage
  */
  flushExpired: function() {
    if (!supportsStorage()) return;

    eachKey(function(key: string) {
      flushExpiredItem(key);
    });
  },

  /**
  * Sets whether to display warnings when an item is removed from the cache or not.
  */
  enableWarnings: function(enabled: boolean) {
    warnings = enabled;
  }
};

export default localStorageInstance;
