/**
 * @module General
 */

import { dispatchCustomEvent } from '../dom';
import { CUSTOM_EVENTS } from '../utils/constants';
import {
  AllowedValueType,
  Empty,
  GenericArguments,
  GenericFunction,
  MultiLevelObject,
  PickEmptyType,
  SingleLevelObject,
  TabsData
} from '../utils/types';

export { default as cloneDeep } from 'lodash.clonedeep';
export { default as isEqual } from 'lodash.isequal';

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
export function isEmpty<T extends AllowedValueType>(data: T | Empty): data is PickEmptyType<T> {
  try {
    if (data === null || data === undefined || typeof data === 'undefined') {
      return true;

    }

    switch (typeof data) {
      case 'string':
        if ((data as string).trim() === '' || (data as string) === 'null' || data === null) {
          return true;
        }

        return false;

      case 'object':
        if (Array.isArray(data) && data.length === 0) {
          return true;
        }

        if (Object.keys(data).length === 0) {
          return true;
        }

        return false;

      case 'number':
        return false;

      default:
        return false;
    }

  } catch (e) {

    dispatchCustomEvent(CUSTOM_EVENTS.TRACK_LOG, {
      function: 'isEmpty',
      params: {
        data
      },
      error: e
    });

    return true;
  }
}


/**
 * This method returns an array of given size filled with provided value
 *
 * @param {number} arraySize - Size of the array i.e number of elements in the array
 * @param {string | number} value - Value that you want to fill in the array
 *
 * @example
 * ```
 * getFilledArray(4,'hello') // ['hello', 'hello', 'hello', 'hello']
 * ```
 */
export function getFilledArray(arraySize: number, value: string | number) {
  return new Array(arraySize).fill(value);
}


/**
 * This method returns the index of the selected tab
 *
 * @param {any} tabs - Array of tabs object
 * @param {string} selectedTabName - Selected tab name
 *
 * @remarks
 * Please ensure that tab object has searchId key to facilitate matching process
 *
 * @example
 * ```
 * getSelectedTabIndex(tabsArrayOfObject,'mutual-funds') // 1
 * ```
 */
export function getSelectedTabIndex(tabs: TabsData[], selectedTabName: string): number {
  let defaultIndex = 0;

  try {
    if (selectedTabName) {
      tabs.map((tab, index) => {
        if (tab.searchId === selectedTabName) {
          defaultIndex = index;
        }
      });
    }

    return defaultIndex;

  } catch (e) {
    console.error('Unable to return the selected tab index');
    return defaultIndex;
  }
}


/**
 * This function can download a file on user's machine either directly by a url or a blob object.
 *
 * @param {
 *  file:File | null;
 *  type:string; fileName:string;
 *  downloadMethod:string;
 *  fileExtension:string;
 *  fileUrl:string | null
 * } downloadConfig
 *
 * @remarks
 *
 * Please ensure you are passing the appropriate downloadMethod type -
 * <br />
 * <br />
 * <p>'url' method expects the fileUrl argument</p>
 * <p>'blob' expects the file argument</p>
 *
 * <br />
 * <h4>downloadConfig properties</h4>
 * <ul>
 *  <li> <span style="font-weight: bold;">file</span> => BlobObject or null. Required if downloadMethod is 'blob' </li>
 *  <li> <span style="font-weight: bold;">type</span> => MIME-TYPE of the file. 'application/pdf', 'application/gzip', 'image/png' </li>
 *  <li> <span style="font-weight: bold;">fileName</span> => Expected name of the downloaded file </li>
 *  <li> <span style="font-weight: bold;">downloadMethod</span> => 'blob' or 'url' </li>
 *  <li> <span style="font-weight: bold;">fileExtension</span> => Expected extension of the downloaded file </li>
 *  <li> <span style="font-weight: bold;">fileUrl</span> => downloadable file's url. Required if downloadMethod is 'url' </li>
 * </ul>
 *
 * @example
 * ```
 * downloadFile({
 *  file: fileBlobObject,
 *  type: 'application/pdf',
 *  fileName: 'MyFile',
 *  fileExtension: 'pdf',
 *  downloadMethod: 'blob',
 *  fileUrl: null
 * }) // *Downloads file of type PDF on the client's machine named MyFile.pdf*
 * ```
 *
 */
export function downloadFile(downloadConfig: { file: File | null; type: string; fileName: string; downloadMethod: string; fileExtension: string; fileUrl: string | null }) {

  const DOWNLOAD_FILE_METHOD = {
    BLOB: 'blob',
    URL: 'url'
  };

  const { file = null, type, fileName, downloadMethod = DOWNLOAD_FILE_METHOD.URL, fileExtension, fileUrl } = downloadConfig;


  const createFileUrlFromBlob = (file: File | null, type: string) => {
    if (file) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([ file ], { type });

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const fileURL = (window.URL || window.webkitURL).createObjectURL(newBlob);

      return fileURL;

    } else {
      throw new Error('file/blob is null');
    }
  };


  const downloadFileFromUrl = (fileUrl: string | null, fileName: string, extension: string) => {
    if (fileUrl) {
      const link = document.createElement('a');

      link.href = fileUrl;
      link.download = `${fileName}.${extension}`;
      link.target = '_blank';

      document.body.appendChild(link);
      link.click();

      setTimeout(function() {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(fileUrl);
      }, 10);

    } else {
      throw new Error('fileUrl is empty');
    }
  };


  try {
    if (typeof window === 'undefined') {
      throw new Error('window is undefined');
    }

    switch (downloadMethod) {
      case DOWNLOAD_FILE_METHOD.BLOB:
        const fileUrlFromBlob = createFileUrlFromBlob(file, type);

        downloadFileFromUrl(fileUrlFromBlob, fileName, fileExtension);
        break;

      case DOWNLOAD_FILE_METHOD.URL:
        downloadFileFromUrl(fileUrl, fileName, fileExtension);

        break;
    }

  } catch (err) {
    console.error('File download failed - ', err);
  }
}


/**
 * This method sorts an Object with key value pairs on the basis of the values. (Check examples for better understanding)
 *
 * @param {SingleLevelObject} obj - Object with key value pairs with single level hierarchy. (Read remarks)
 * @param {boolean} isDescending - Sort in descending order or not. Defaults to false. Optional argument.
 *
 * @remarks
 * Object should be of a single level. Avoid nested objects or arrays. In case of error, method returns the original object.
 *
 * @example
 * ```
 * const list = { yellow: 1, blue: 10, red: 5, green: 6, pink: 8 };
 * const listWrong = { yellow: 1, blue: [ 'I', 'am', 'blue' ], red: 5, green: { i: 'i', am: 'am', green: 'green' }, pink: 8 };
 *
 * sortObjectByValue(list, true); // { blue: 10, pink: 8, green: 6, red: 5, yellow: 1 }
 * sortObjectByValue(list); // { yellow: 1, red: 5, green: 6, pink: 8, blue: 10 }
 *
 * sortObjectByValue(listWrong);
 * // console => Error in sorting object, original object returned : ErrorObject
 * // { yellow: 1, blue: [ 'I', 'am', 'blue' ], red: 5, green: { i: 'i', am: 'am', green: 'green' }, pink: 8 }
 * ```
 */
export function sortObjectByValue(obj: SingleLevelObject, isDescending?: boolean) {
  try {
    const sortable = [];

    for (const key in obj) {
      sortable.push([ key, obj[key] ]);
    }

    sortable.sort(function(a, b) {
      if (isDescending) {
        return (b[1] < a[1] ? -1 : (b[1] > a[1] ? 1 : 0));

      } else {
        return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0));
      }
    });

    const orderedList: SingleLevelObject = {};

    for (const idx in sortable) {
      orderedList[sortable[idx][0]] = sortable[idx][1];
    }

    return orderedList;

  } catch (error) {
    console.error('Error in sorting object, original object returned', error);
    return obj;
  }
}


/*
 * Returns the value at given path from the source object. If path is not found then default value is returned.
 * This method works exactly like Lodash's getData method.
 *
 * @param { { [key: string]: unknown } } obj - Source object
 * @param {string} path - Path to desired key inside source object
 *
 * @remarks
 * Provide a default value always to avoid unexpected behavior
 *
 * @example
 * ```
 * const obj = { a: { b: [ 56, 75, 23 ], d: 1 }, e: 2 };
 *
 * getData(obj, 'a.d', null) // 1
 * getData(obj, 'e', null) // 2
 * getData(obj, 'a.d.e', 'random') // 'random'
 * getData(obj, 'a.b[0]', null) // 56
 * getData(obj, 'a.b.[2]', null) // 23
 * ```
 */
export function getData(obj: any, path: string, def: null | unknown = null): any {

  function replaceAll(originalString:string, search:string, replace:string) {
    return originalString?.split(search)?.join(replace);
  }


  const sanitzePath = (currPath: string) => {

    const stringsToReplace = [ '[', ']', '..' ];

    // 'a.[0].b.c' => 'a.0.b.c'
    const currPathString = String(currPath);

    let sanitizedPath = currPathString;

    for (const index in stringsToReplace) {
      sanitizedPath = replaceAll(sanitizedPath, stringsToReplace[index], '.');
    }

    const isLastIndexDot = sanitizedPath.lastIndexOf('.') === sanitizedPath.length - 1;

    sanitizedPath = sanitizedPath.slice(0, isLastIndexDot ? sanitizedPath.lastIndexOf('.') : sanitizedPath.length);

    return sanitizedPath;
  };

  try {
    const newPathArray = String(sanitzePath(path)).split('.');

    for (const path of newPathArray) {
      obj = obj?.[path] as any;
    }

    return typeof obj === 'undefined' ? def : obj;

  } catch (e) {
    console.error('Error while using getData', e);

    dispatchCustomEvent(CUSTOM_EVENTS.TRACK_LOG, {
      function: 'getData',
      params: {
        obj,
        path,
        def
      },
      error: e
    });

    return def;
  }
}


/**
 * This method is used to parse an object into entries. Works exactly like Object.entries.
 * Object.entries is still not fully supported so consider this a polyfill for the same.
 *
 * { key1: value1, key2: value2 } => [ [ key1, value1 ], [ key2, value2 ] ]
 *
 * @param {MultiLevelObject} obj - Object to be parsed into entries.
 *
 * @example
 * ```
 * const dummy1 = { key1: value1, key2: value2, key3: value3 };
 * const dummy2 = { key1: 'value1', key2: 'value2', key3: [ 1, 2, 3 ], key4: { a: 1, b: 2 } }
 *
 * getObjectEntries(dummy1) // [ [ key1, value1 ], [ key2, value2 ], [ key3, value3 ] ];
 * getObjectEntries(dummy2) // [ [ key1, value1 ], [ key2, value2 ], [ key3 , [ 1, 2, 3 ] ],[ key4,{ a:1, b:2 } ] ];
 * ```
 */
export function getObjectEntries(obj: any) {
  try {
    const keys = Object.keys(obj);

    return keys.map(key => ([ key, obj[key] ]));

  } catch (error) {
    console.error('There was problem while creating object entries', error);

    throw error;
  }
}


/**
 * This method searches for an object inside an array of objects based on the object key and expected value then returns its index.
 * Returns -1 if key not found.
 *
 * @param {MultiLevelObject[]} searchArr - Array of objects to search within
 * @param {string} matchKey - Key of the object to be matched
 * @param {MatchValueType} matchValue - Expected value to be matched
 *
 * @remarks
 * <br/>
 * Please ensure not to send chained keys as matchKey.
 * <br/>
 * 'key' | 'name' => Correct
 * <br/>
 * 'key.name[0]' | 'address.pincode' => Incorrect
 *
 * @example
 * ```
 * const dummy = [ { rollNo: 1 }, { rollNo: 2 }, { rollNo: 3 }, { rollNo: 4 } ];
 *
 * getIndexByMatchingObjectValue<number>(dummy, 'rollNo', 4); // 3
 * getIndexByMatchingObjectValue<number>(dummy, 'rollNo', 3); // 2
 * getIndexByMatchingObjectValue<number>(dummy, 'rollNo', 6); // -1
 *
 * getIndexByMatchingObjectValue<number>(dummy, 'address', 6); // -1
 * getIndexByMatchingObjectValue<number>(dummy, 'address.pincode', 6); // -1
 * ```
 */
export function getIndexByMatchingObjectValue<MatchValueType>(searchArr: MultiLevelObject[], matchKey: string, matchValue: MatchValueType) {
  try {
    for (let i = 0; i < searchArr.length; i++) {
      const obj = searchArr[i];

      if (obj[matchKey] === matchValue) {
        return i;
      }
    }

    return -1;

  } catch (error) {
    console.error('Error while find index by matching object value', error);

    throw error;
  }
}


/**
 * This method returns the path from the url. By default it returns the last path i.e last slash part from the URL.
 * If you want you can get any path from URL by passing index from last value param
 *
 * @param {string} url - The url that is entered
 * @param {number} indexFromLast - The index from last slash in the URL. By default it is the last index.
 *
 * @example
 * ```
 * getPathVariableFromUrlIndex('https://groww.in/mutual-funds/user/explore')       //explore
 * getPathVariableFromUrlIndex('https://groww.in/mutual-funds/user/explore', 2)   //mutual-funds
 * ```
 *
 */
export function getPathVariableFromUrlIndex(url: string, indexFromLast: number = 0) {
  try {
    const keys = [ ...url.split('/') ];

    if (keys.length > indexFromLast) {
      let searchId = keys?.[keys?.length - 1 - indexFromLast];

      const queryParamIndex = searchId?.indexOf('?');

      if (queryParamIndex >= 0) {
        searchId = searchId.substring(0, queryParamIndex);
      }

      return searchId;
    }

  } catch (error) {
    console.error('Unable to get path variable - ', error);

    dispatchCustomEvent(CUSTOM_EVENTS.TRACK_LOG, {
      function: 'getPathVariableFromUrlIndex',
      params: {
        url,
        indexFromLast
      },
      error
    });

    return '';
  }
}


/**
 * This method is used to forcefully delay a function and cancel all intermediate redundant calls made within the span of delay.
 * Returns a method that will debounce by expected delay when called.
 *
 * @param {GenericFunction} func - Method that needs to be debounced
 * @param {number} delay - Amount of delay in miliseconds
 * @param {boolean} leading - A boolean value for if the debounce functions is leading
 * @example
 * ```
 * export function Input() {
 *      const [ query, setQuery ] = useState('');
 *      const [ result, setResult ] = useState([]);
 *
 *      const searchQuery = async (val) => {
 *          const resp = await searchApi(val);
 *          setResult(resp.data);
 *      }
 *
 *      const debouncedSearchQuery = debounce(searchQuery, 500, true);
 *
 *      const onQueryInput = (event) => {
 *          setQuery(event.target.value);
 *          debouncedSearchQuery();
 *      }
 *
 *      const handleKeyDown = (event) => {
 *          // to clear the interval when enter key is pressed, only useful for specific usecases
 *          if(event.key === 'enter'){
 *              debouncedSearchQuery.cance();
 *          }
 *      }
 *
 *      return (
 *          <input
 *              {...props}
 *              handleKeyDown={handleKeyDown}
 *              onChange={onQueryInput}
 *          />
 *      )
 * }
 *
 * // This will result in searchQuery method to be delayed by 500ms.
 * // If the user continues to input query within span of 500ms. Then all redundant calls will cancelled.
 *
 * // Without debounce => 'abcde' => 5 calls individually for a, ab, abc, abcd, abcde
 * // With debounce => 'abcde' => 1 call for abcde
 * ```
 *
 * @remarks
 * the returned callback will have a property named "cancel" to cancel the recurring debounce
 *
 */
export function debounce(func: GenericFunction, delay: number = 200, leading: boolean = false) {
  let timeout: ReturnType<typeof setTimeout>;


  const debouncedFunction = (...args: GenericArguments) => {
    if (!timeout && leading) {
      func(...args);
    }

    clearTimeout(timeout);

    timeout = setTimeout(() => func(...args), delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeout);
  };

  return debouncedFunction;
}


/**
 *
 * This method is used to throttle async functions, and therefore is modified version of the normal throttle
 *
 * @param callback function to throttle
 * @param intervalInMs time interval in microseconds after which the callback is required
 * @returns the original callback but throttled with given interval
 *
 * @example
 * ```
 * // function which gets a resource
 * async function getSomeResource() {
 *    // a resource which takes time
 *    return await new Promise((resolve)=>setTimeout(resolve("your resource"),2000))
 * }
 *
 * // enhancing the function via throttle
 * const throttledFunction = throttle(getSomeResource,5000);
 *
 * // trying to access the resource
 * const printResource = async () => {
 *    const result = throttledFunction();
 *    console.log(result);
 * }
 *
 * printResource() // calling it multiple times to see the behaviour
 *
 * // result: "your resource"
 * ```
 *
 * @remarks
 * this function is specifically designed to handle asynchronous functions
 *
 */
export function asyncThrottle(callback:GenericFunction, intervalInMs: number) {
  let lastRun = 0;


  const throttled = async (...args: GenericArguments) => {
    const currentWait = lastRun + intervalInMs - Date.now();
    const shouldRun = currentWait <= 0;

    if (shouldRun) {
      lastRun = Date.now();
      return await callback(args);

    } else {
      return await new Promise(function(resolve) {
        setTimeout(function() {
          resolve(throttled(args));
        }, currentWait);
      });
    }
  };

  return throttled;
}


/**
 * This method is like `uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @param arr The array to inspect
 * @param iteratee The iteratee invoked per element.
 *
 * @example
 * ```
 * const arr = [ 12, undefined, { id: 1, name: 'bob' }, null,  { id: 1, name: 'bill' }, null, undefined ];
 *
 * uniqBy(arr, 'name');   // [ { id: 1, name: 'bob' }, { id: 1, name: 'bill' }]
 * ```
 */
export function uniqBy(arr: GenericFunction, iteratee: GenericFunction) {
  try {
    if (!Array.isArray(arr)) {
      return [];
    }

    const cb = typeof iteratee === 'function' ? iteratee : (o: GenericFunction) => o[iteratee];

    const pickedObjects = arr
      .filter(item => item)
      .reduce((map, item) => {
        const key = cb(item);

        if (!key) {
          return map;
        }

        return map.has(key) ? map : map.set(key, item);
      }, new Map())
      .values();

    return [ ...pickedObjects ];

  } catch (error) {
    console.error(error);

    throw error;
  }
}


/**
 * Removes values from array using function as predicate. Returns removed values.
 *
 * @param {Array} array
 * @param {function} predicate
 *
 * @returns {Array}
 *
 * @example
 * ```
 * const arr = [ 1, 2, 3, 4, 5, 6 ];
 *
 * const freshArr = remove(arr, (elem) => {
 *    return !!(elem % 2)
 * })
 *
 * // Predicate returned true for every odd value and false for every even value.
 * // For the ones predicate returned true, were deleted from the array. Removed values were returned.
 *
 * // arr = [ 2, 4, 6 ];
 * // freshArr = [ 1, 3, 5 ];
 * ```
 *
 */
export function remove<T>(array: T[], predicate: (elem: T, index: number, list: T[]) => boolean): T[] {
  try {
    const len = array.length;

    const idsToRemove = [];
    const removedValues = [];

    for (let counter = 0; counter < len; counter++) {

      if (predicate(array[counter], counter, array)) {

        idsToRemove.push(counter - idsToRemove.length);
        removedValues.push(array[counter]);

      }

    }

    idsToRemove.forEach(id => array.splice(id, 1));

    return removedValues;

  } catch (e) {

    console.error(e);

    throw e;
  }
}


/**
 * Returns new object with copied all properties without the ones specified.
 *
 * @param {MultiLevelObject} object - source object
 * @param {string[]} props - properties to omit
 *
 * @example
 *
 * omit({ name: 'Jack', age: 69, title: 'Mr' }, ['age', 'title']);
 * // { name: 'Jack' }
 *
 * @returns {MultiLevelObject} - new object without given properties
 */
export function omit(object: MultiLevelObject | null, props: string[]): MultiLevelObject | null {

  try {
    // if empty, or not type of object, return empty object
    if (isEmpty(object) || (typeof object !== 'object')) {
      return {};
    }

    const useProps = props.map(String); // TypeCasting in string

    const result = {};

    for (const key in object) {

      if (!useProps.includes(key)) {
        (result as MultiLevelObject)[key] = object[key];
      }

    }

    return result;

  } catch (e) {
    console.error(e);
    return object;
  }
}


/**
 * Returns object or array by parsing the string passed based on the parsed type
 *
 * @param {string} filter - source string
 * @param {string[]} defaultValue - [] or {}
 *
 * @example
 *
 * getEntityFiltersFromJSONString('['age', 'title']',[]);
 * // ['age', 'title']
 *
 * @returns {Object | Array} - parsed object or array from the string passed
 */
export const getEntityFiltersFromJSONString = (filter: string, defaultValue:Object | [] = []) => {
  try {
    const parsedFilters = JSON.parse(filter);
    const isObject = typeof parsedFilters === 'object' && parsedFilters !== null;

    if (isObject || Array.isArray(parsedFilters)) {
      return parsedFilters;
    }

    return defaultValue;

  } catch (e) {
    return defaultValue;
  }
};


/**
 * This method is a wrapper over JSON.parse which catches any exceptions if comes
 *
 * @param {string} parameter - source string
 * @param {string} fallback - default value is ''
 * @param {(this: any, key: string, value: any) => any} reviver - this is the reviver method of JSON.parse.
 * Read MDN docs for more on the reviver method:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter
 *
 * @example
 *
 * parseJSON('{a:'b'}')
 *
 * @returns {Object | Array} - parsed object or array from the string passed
 */
export const parseJSON = (parameter: string, fallback = '', reviver?: (this: any, key: string, value: any) => any) => {
  try {
    return JSON.parse(parameter, reviver);

  } catch (exception) {
    return fallback;
  }
};


/*
 * Strictly check if all values in an object is 0.
 *
 * @function
 * @since ella:0.2.0
 * @param object
 * @returns boolean
 * @remarks
 * Currently the function does not support nested objects.
 *
 * @example
 * ```
 * isAllObjectValuesZero({ key1: 0, key2: 0, key3: 0 }) // true
 * isAllObjectValuesZero({ key1: '0', key2: 0, key3: 0 }) // false
 * isAllObjectValuesZero({ key1: 'some value', key2: 0, key3: 0 }) // false
 * isAllObjectValuesZero(null) // true
 * isAllObjectValuesZero(undefined) // true
 * isAllObjectValuesZero({}) // true
 * isAllObjectValuesZero({ key1: 0, key2: 0, key3: { key4: 0 } }) // false
 *
 * ```
 */
export const isAllObjectValuesZero = (obj: object) => {
  try {
    if (obj === null || typeof obj === 'undefined') {
      return true;
    }

    return Object.values(obj).every(val => val === 0);

  } catch (e) {
    console.error('Failed with: ', e);
  }
};


/**
 * Returns object by removing all the null values from an object or a deeply nested object also without mutating the current object
 *
 * @param {MultiLevelObject} obj - source object
 *
 * @example
 * ```
 * const obj = {
 *  one: null,
 *  two: 2,
 *  three: null,
 *  four: {
 *     five: null
 *   }
 * }
 *
 * removeNullProperties(obj)
 * O/P -
 * newObj = {
 *      two: 2,
 *      four: {}
 *    }
 *
 * ```
 *
 * @returns { Object } - Returns a new object without null values
 */
export function removeNullProperties(obj: MultiLevelObject) {

  try {
    const newObj: MultiLevelObject = {};

    getObjectEntries(obj).forEach(([ key, value ]) => {
      if (value === Object(value)) {
        newObj[key] = removeNullProperties(value);

      } else if (value != null) {
        newObj[key] = obj[key];
      }
    });

    return newObj;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Parses a cookie string into a valid JSON object.
 *
 * @param {cookie} string
 *
 * @example
 * ```
 * const parsedCookieJson = parseCookieToJson('cookie1=some-data;cookie2=other-data') // Output: { cookie1: "some-data", cookie2: "other-data" }
 * ```
 *
 * @returns { Object } - Returns an object which is the json representation of the cookie string
 */

export function parseCookieToJson(cookie: string | undefined) {
  if (!cookie) return {};

  let cookieObj : {[key: string]: string} = {};

  cookieObj = cookie.split(';').reduce((finalObj, singleCookie) => {
    const [ key, value ] : string[] = singleCookie.split('=');

    finalObj[key.trim()] = value;

    return finalObj;
  }, {} as {[key: string]: string});

  return cookieObj;
}
