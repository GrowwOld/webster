/**
 * @module General
 */

import {
  GenericArguments,
  GenericFunction,
  MultiLevelObject,
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
export function isEmpty(data: any) {
  try {
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

  } catch (e) {
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
    if (isEmpty(window)) {
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

  const sanitzePath = (currPath: string) => {

    // 'a.[0].b.c' => 'a.0.b.c'

    let sanitizedPath = String(currPath).replaceAll('[', '.').replaceAll(']', '.').replaceAll('..', '.');

    const isLastIndexDot = sanitizedPath.lastIndexOf('.') === sanitizedPath.length - 1;

    sanitizedPath = sanitizedPath.slice(0, isLastIndexDot ? sanitizedPath.lastIndexOf('.') : sanitizedPath.length);

    return sanitizedPath;
  };

  try {
    const newPathArray = String(sanitzePath(path)).split('.');

    for (const path of newPathArray) {
      obj = obj[path] as any;
    }

    return typeof obj === 'undefined' ? def : obj;

  } catch (e) {
    console.error('Error while using getData', e);
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

    return '';
  }
}


/**
 * This method is used to forcefully delay a function and cancel all intermediate redundant calls made within the span of delay.
 * Returns a method that will debounce by expected delay when called.
 *
 * @param {GenericFunction} func - Method that needs to be debounced
 * @param {number} delay - Amount of delay in miliseconds
 *
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
 *      const debouncedSearchQuery = debounce(searchQuery, 500);
 *
 *      const onQueryInput = (event) => {
 *          setQuery(event.target.value);
 *          debouncedSearchQuery();
 *      }
 *
 *      return (
 *          <input
 *              {...props}
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
 */
export function debounce(func: GenericFunction, delay: number = 200) {
  let timeout: ReturnType<typeof setTimeout>;

  return function(...args: GenericArguments) {

    clearTimeout(timeout);

    timeout = setTimeout(() => {

      func(...args);

    }, delay);
  };
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
