
/**
 * This File deals with the native session storage methods.
 *
 * @remarks
 * These methods are a part of our Storage Library.
 *
 * @example
 * Here's an example how to use the service:
 * ```
 * console.log(sessionStorageInstance.set('key','value')); => Output will be true and will be stored.
 * ```
 * ```
 * console.log(sessionStorageInstance.get('key')); => Output will be 'value' if exist else null.
 * ```
 * @internal
 */

let cachedJSON : any;

let warnings = false;
let isStorageSupported: boolean | undefined;

// Determines if localStorage is supported in the browser;
// result is cached for better performance instead of being run each time.
// Feature detection is based on how Modernizr does it;
// it's not straightforward due to FF4 issues.
// It's not run at parse-time as it takes 200ms in Android.
function supportsStorage() {
  const key = '__sessionStorageInstanceTest__';
  const value = key;

  if (isStorageSupported !== undefined) {
    return isStorageSupported;
  }

  // some browsers will throw an error if you try to access session storage
  // hence check is inside a try/catch
  try {
    if (!sessionStorage) {
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
    isStorageSupported = false;
  }

  return isStorageSupported;
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
* Wrapper functions for sessionStorage methods
*/

function getItem(key: string) {
  return sessionStorage.getItem(key);
}


function setItem(key: string, value: any) {
  sessionStorage.removeItem(key);
  sessionStorage.setItem(key, value);
}


function removeItem(key: string) {
  sessionStorage.removeItem(key);
}


function warn(message: string, err: any) {
  if (!warnings) return;
  if (!('console' in window) || typeof window.console.warn !== 'function') {
    return;
  }

  if (err) {
    window.console.warn('sessionStorageInstance - The error was: ' + err.message);
  }

  window.console.warn('sessionStorageInstance - ' + message);
}

const sessionStorageInstance = {

  /**
  * Stores the value in localStorage. Expires after specified number of minutes.
  * @param {string} key
  * @param {Object|string} value
  * @return {boolean} whether the value was inserted successfully
  */
  set: function(key: string, value: any): boolean {
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
        // If it was some other error, just give up.
      warn('Could not add item with key \'' + key + '\'', e);
      return false;

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

    removeItem(key);
  },

/**
  * clear sessionStorage
  */
  clear: function() {
    if (!supportsStorage()) return;

    sessionStorage.clear();
  },

  /**
  * Sets whether to display warnings when an item is removed from the cache or not.
  */
  enableWarnings: function(enabled: boolean) {
    warnings = enabled;
  }
};

export default sessionStorageInstance;
