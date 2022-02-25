/**
 * @module DOM
 */

import { isEmpty } from '../general';

/**
 * This method can be used to listen any custom event.
 *
 * @param {string} eventName - Name of the event that you want to listen or subscribe
 * @param {Function} callback - Callback function which will be called upon dispatching of that event
 *
 * @remarks
 * It's strongly recommended to add the event name in utils/constants/CUSTOM_EVENTS and use. No literals allowed.
 *
 * @example
 * ```
 * listenToCustomEvent(CUSTOM_EVENTS.file_loaded, this.xyz)
 * ```
 */
export function listenToCustomEvent(eventName: string, callback: Function) {
  try {
    if (!isEmpty(document)) {
      document.documentElement.addEventListener(eventName, callback as EventListener);
    }

  } catch (error) {
    console.error(`Error in listening to ${eventName} custom event: `, error);
  }
}


/**
 * This method can be used to dispatch any custom event.
 *
 * @param {string} eventName - Name of the event that you want to dispatch
 * @param {object} eventDetails - OPTIONAL param, eventDetails object can be used to pass extra details
 *
 * @remarks
 * It's strongly recommended to add the event name in utils/constants/CUSTOM_EVENTS and use. No literals allowed.
 *
 * @example
 * ```
 * dispatchCustomEvent(CUSTOM_EVENTS.file_loaded)
 * dispatchCustomEvent(CUSTOM_EVENTS.file_loaded, {user: 'Ella'})
 * ```
 */
export function dispatchCustomEvent(eventName: string, eventDetails: object = {}) {
  if (!isEmpty(document)) {
    const temp = document.documentElement;

    temp.dispatchEvent(new CustomEvent(eventName, { detail: eventDetails }));
  }
}


/**
 * This method can be used to unlisten any custom event.
 *
 * @param {string} eventName - Name of the event that you want to unlisten or unsubscribe
 * @param {Function} methodToUnlisten - The EventListener function of the event handler to remove from the event target.
 *
 * @remarks
 * It's strongly recommended to add the event name in utils/constants/CUSTOM_EVENTS and use. No literals allowed.
 *
 * @example
 * ```
 * unlistenToCustomEvent(CUSTOM_EVENTS.file_loaded, this.xyz)
 * ```
 */
export function unlistenToCustomEvent(eventName: string, methodToUnlisten: Function) {
  try {
    if (!isEmpty(document)) {
      document.documentElement.removeEventListener(eventName, methodToUnlisten as EventListener);
    }

  } catch (error) {
    console.error(` Error in unListening to ${eventName} custom event: `, error);
  }
}


/**
 * This method can be used to scroll your html page to top.
 *
 * @example
 * ```
 * scrollPageToTop();
 * ```
 */
export function scrollPageToTop() {
  if (!isEmpty(window)) {
    window.scrollTo(0, 0);
  }
}


/**
 * This method can be used to block special character in input field, also you can allow few special chars as per your requirement
 *
 * @param {string} eventObject - Event object
 * @param {string[]} allowedArr - Array of allowed chars
 *
 * @remarks
 * How to use - Just send the event object here in the onKeyPress callback of input
 *
 * @example
 * ```
 * blockSpecialChars(event, ['@', '%'])
 * ```
 */
export function blockSpecialChars(eventObject: React.KeyboardEvent<HTMLInputElement>, allowedArr: string[]) {
  const k = eventObject.key;

  if ((k >= 'a' && k <= 'z') || (k >= 'A' && k <= 'Z') || k === 'Backspace' || k === ' ' || (k >= '0' && k <= '9') || k === '.' || k === ',') {
    // do nothing
  } else {
    if (allowedArr.includes(k)) {
      // do nothing
    } else {
      eventObject.preventDefault();
    }
  }
}


/**
 * This method can be used to copy some text to clipboard.
 *
 * @param {string} str - String that you want to copy to the clipboard
 *
 * @example
 * ```
 * copyToClipboard("URN: 2303232923");
 * ```
 */
export function copyToClipboard(str: string) {
  /**
   * This function is used to copy anything to the clipboard
   */
  const el = document.createElement('textarea');

  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}


/**
 * This method creates a timestamp in the browser's performance entry buffer with the given name.
 *
 * @param {string} name - Name of the event whose performance you want to measure
 *
 * @example
 * ```
 * performanceMark('ComponentWillMount');
 * performanceMark('ComponentMounted');
 * performanceMeasure('ComponentWillMount','ComponentMounted')
 * ```
 */
export function performanceMark(name: string) {
  if (window?.performance?.mark) {
    window.performance.mark(name);
  }
}


/**
 * This method returns the difference of timestamp between 2 performance marks
 *
 * @param {string} markStart - Starting mark created using performanceMark method
 * @param {string} markEnd - Ending mark created using performanceMark method
 *
 * @example
 * ```
 * performanceMark('ComponentWillMount');
 * performanceMark('ComponentMounted');
 * console.log("Component mounted in ms - "performanceMeasure('ComponentWillMount','ComponentMounted'));
 * ```
 */
export function performanceMeasure(markStart: string, markEnd: string) {
  if (window?.performance?.measure) {
    return window.performance.measure('', markStart, markEnd).duration;
  }
}


/**
 * This method can be used to encode path variables & query params in the URL.
 *
 * @param {string} queryParam - Param that you want to encode
 *
 * @remarks
 * It's advisable to always encode your query param or path variables before hitting the URL
 *
 * @example
 * ```
 * const url = `/abc/xyz/${encodeURL(searchId)}`;
 * ```
 */
export function encodeURLParams(queryParam: string) {
  let decodedURL = '';

  try {
    decodedURL = decodeURIComponent(queryParam); // To avoid double encoding as then it will fail to decode the string

  } catch (e) {
    decodedURL = queryParam;
  }

  return encodeURIComponent(decodedURL);
}


/**
 * This method can be used to get the browser name.
 *
 * @remarks
 * This method depends on userAgent sniffing and therefore susciptible to spoofing. Avoid detecting browsers in business impacting code
 *
 * @example
 * ```
 * console.log('Browser Name - ',getBrowserName());
 * ```
 */
export function getBrowserName(): string {
  if (!isEmpty(window) && !isEmpty(navigator)) {
    if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
      return 'Opera';

    } else if (navigator.userAgent.indexOf('Edg') !== -1) {
      return 'Edge';

    } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
      return 'Chrome';

    } else if (navigator.userAgent.indexOf('Safari') !== -1) {
      return 'Safari';

    } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
      return 'Firefox';

      // Double exclaimation is used to cast a value to boolean
    } else if ((navigator.userAgent.indexOf('MSIE') !== -1) || (!!document.DOCUMENT_NODE)) { //IF IE > 10
      return 'IE';

    } else {
      return 'unknown';
    }

  } else {
    return '';
  }
}


/**
 * This method can be used to get the OS Name.
 *
 * @remarks
 * This method depends on userAgent sniffing and therefore susciptible to spoofing. Avoid detecting browsers in business impacting code
 *
 * @example
 * ```
 * console.log('Browser Name - ',getOSName());
 * ```
 */
export function getOSName() {
  if (!isEmpty(window) && !isEmpty(navigator)) {
    const userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = [ 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K' ],
      windowsPlatforms = [ 'Win32', 'Win64', 'Windows', 'WinCE' ],
      iosPlatforms = [ 'iPhone', 'iPad', 'iPod' ];

    let os = '';

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';

    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';

    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';

    } else if (/Android/i.test(userAgent)) {
      os = 'Android';

    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  }

  return '';
}


/**
 * This function scrolls the page to the top.
 * If window.scroll is available and works perfectly, this function uses the smooth scroll behaviour of window
 * and scrolls with ease in animation. Else, It directly scrolls to top without animation in case of error with
 * window.scroll.
 *
 * @example
 * ```
 * smoothScrollToTop();  // The page is scrolled to the top. With animation if window object is present,
 * without animation if window object is not present.
 * ```
 */
export function smoothScrollToTop() {
  if (!isEmpty(window)) {
    try {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });

    } catch (err) {
      window.scrollTo(0, 0);
    }
  }
}


/**
 * This function scrolls to the position of an element with an id.
 *
 * @param {string} elementId - id of the element to which the page needs to be scrolled to
 * @param {number} offset - offset from top if we want to leave some space between the element top boundary
 * and top of the scrolled window. this is and optional parameter. default value is 0
 *
 * @remarks
 * If element with particular id is not present at the time when this function is called,
 * then do nothing. A console.error will be called in such a case.
 *
 * @example
 * ```
 * smoothScrollToElementWithId('enterAmountDiv');  // scroll the div with id 'enterAmountDiv' to top of the window
 * smoothScrollToElementWithId('enterAmountDiv', 0);  // scroll the div with id 'enterAmountDiv' to top of the window
 * smoothScrollToElementWithId('enterAmountDiv', 100);  // scroll the div with id 'enterAmountDiv' to 100px below the top of the window
 * * ```
 */
export function smoothScrollToElementWithId(elementId: string, offset: number = 0) {
  try {
    if (!isEmpty(window)) {
      const element = document.getElementById(elementId);

      if (element) {
        const headerOffset = offset;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

  } catch (error) {
    console.error('Error in scrollToElementWithId: ', error);
  }
}


// REMARK - This method fails for 12.0.0 or 12.... use case in chrome, mozilla. It's because they dont add decimal in the string
// REMARK - We can rewrite it with one more argument to work in all use cases but let's not write till someone really wants this.
// export function ignoreSecondDecimalInput(eventObject: React.KeyboardEvent<HTMLInputElement>, currentValue: number | string) {
//   const k = eventObject.key;

//   // Convert to string if argument currentValue is in number
//   const str = currentValue.toString();

//   // One decimal is already present and this key pressed is also decimal
//   if (str.includes('.') && k === '.') {
//     eventObject.preventDefault();
//   }
// }

// REMARK - This method fails for 0.0 use case in chrome, mozilla. It's because they dont add decimal in the string
// REMARK - We can rewrite it with one more argument to work in all use cases but let's not write till someone really wants this.
// export function stopConsecutiveZeroesInput(eventObject: React.KeyboardEvent<HTMLInputElement>, currentValue: number | string) {
//   if (!isEmpty(currentValue)) {
//     const k = eventObject.key;

//   // current value length 1 and char is 0 and current press char is 0 then stop
//     const temp = currentValue.toString();

//     if (temp.length === 1 && temp.charAt(0) === '0' && k === '0') {
//       eventObject.preventDefault();
//     }
//   }
// }


/**
 * This method can be used to block the input after given decimal points
 *
 * @param {React.KeyboardEvent<HTMLInputElement>} eventObject - onKeyDown event object
 * @param {number | string} currentValue - Current value of input field
 * @param {number} toFixed - How many digits allowed after decimal. Default is 2
 *
 * @remarks
 * It's strongly recommended to use this method on onKeyDown event to prevent the key from registering
 *
 * @example
 * ```
 * <input
 *   type="number"
 *   onInput={this.handleInput}
 *   value={this.state.value}
 *   onKeyDown={(eventObject) => allowedDecimalPointInput(eventObject, this.state.value, 4)}
 * />
 * ```
 */
export function allowedDecimalPointInput(eventObject: React.KeyboardEvent<HTMLInputElement>, currentValue: number | string, toFixed:number = 2) {
  if (isUtilKeyPressed(eventObject.key)) {
    return; // dont do anything, it's a valid key, let it get pressed
  }

  const temp = currentValue.toString(); //Handle for number | string

  // Temp length should be more than 1 minimum to make sense & should include decimal
  if (!isEmpty(temp) && temp.length > 1 && temp.includes('.')) {
    const digitsAfterDecimal = (temp.split('.'))[1];

    if (digitsAfterDecimal.length >= toFixed) {
      eventObject.preventDefault();
    }
  }
}


/**
 * This method can be used to block all the other input except numbers and utility keys
 *
 * @param {React.KeyboardEvent<HTMLInputElement>} eventObject - onKeyDown event object
 *
 * @remarks
 * It's strongly recommended to use this method on onKeyDown event to prevent the key from registering
 *
 * @example
 * ```
 * <input
 *   type="number"
 *   onInput={this.handleInput}
 *   value={this.state.value}
 *   onKeyDown={(eventObject) => allowOnlyNumberKeys(eventObject)}
 * />
 * ```
 */
export function allowOnlyNumberKeys(eventObject: React.KeyboardEvent<HTMLInputElement>) {
  if (isUtilKeyPressed(eventObject.key)) {
    return; // dont do anything, it's a valid key, let it get pressed
  }

  const k = eventObject.key;

  if (!(k >= '0' && k <= '9')) {
    eventObject.preventDefault();
  }
}


/**
 * This method can be used to block all the other input except numbers, decimal and utility keys
 *
 * @param {React.KeyboardEvent<HTMLInputElement>} eventObject - onKeyDown event object
 *
 * @remarks
 * It's strongly recommended to use this method on onKeyDown event to prevent the key from registering
 *
 * @example
 * ```
 * <input
 *   type="number"
 *   onInput={this.handleInput}
 *   value={this.state.value}
 *   onKeyDown={(eventObject) => allowNumbersAndDecimal(eventObject)}
 * />
 * ```
 */
export function allowNumbersAndDecimal(eventObject:React.KeyboardEvent<HTMLInputElement>) {
  if (isUtilKeyPressed(eventObject.key)) {
    return; // dont do anything, it's a valid key, let it get pressed
  }

  const k = eventObject.key;

  if (!((k >= '0' && k <= '9') || (k === '.'))) {
    eventObject.preventDefault();
  }
}


/**
 * This method returns a boolean value telling if the key pressed is utility key or not.
 * Utility Key - ArrowLeft, ArrowRight, Backspace, Delete
 *
 * @param {string} keyValue - key which got pressed i.e eventObject.key
 *
 * @remarks
 * It's strongly recommended to use this method on onKeyDown event to prevent the key from registering
 */
export function isUtilKeyPressed(keyValue:string) {
  const isUtilsKey = [ 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete' ].includes(keyValue);

  return isUtilsKey;
}


/**
 * This method is used to push a message along with some data to a window instance. Useful in scenarios like iFrames, Webviews or Window Modals.
 * Must be used in conjuction with listenToWindowMessage method above.
 *
 * @param {Window} targetWindow - Target window that needs to listen to the message. Defaults to current window.
 * @param {string} action - Action type
 * @param {Object} params - POJO - Any payload to be passed along with the action
 * @param {string} eventIdentifier - Unique identifier for your event. Defaults to CUSTOM_MESSAGE
 *
 * @example
 * ```
 * const newWindow = window.open("https://groww.in/random-route", "_blank");
 *
 * postWindowMessage(newWindow, 'CHANGE_THEME', { theme: 'dark' }, 'MY_EVENT');
 * ```
 */
export function postWindowMessage(action: string = 'WINDOW_ACTION', params: Object = {}, eventIdentifier: string = 'CUSTOM_MESSAGE', targetWindow?: Window | undefined) {
  try {

    if (isEmpty(window)) {
      throw new Error('window is undefined');
    }

    const message: {
      action: string;
      params: Object;
      identifier: string;
    } = {
      action,
      params,
      identifier: eventIdentifier
    };

    const windowObj = isEmpty(targetWindow) ? window : targetWindow;

    windowObj?.postMessage(message, window?.location?.origin ?? '*');

  } catch (error) {
    console.error('Error while window.postMessage', error);
    throw error;
  }
}

/**
 * This method is used to listen to the message event and receive data across windows. Must be used in conjuction with postWindowMessage method above.
 *
 * @param {Function} eventCallback - Method to execute when message is received.
 * @param {string} eventIdentifier - Unique event identifier which is used while posting message using postWindowMessage method
 *
 *
 * @example
 * ```
 * listenToWindowMessage((messageData) => {
 *    console.log(messageData);
 * }, 'MY_EVENT')
 * ```
 */
export function listenToWindowMessage(eventCallback: Function, eventIdentifier: string = 'CUSTOM_MESSAGE') {
  try {

    if (isEmpty(window)) {
      throw new Error('window is undefined');
    }

    window.addEventListener('message', (event) => {

      const isOriginBreach = event.origin !== window.location.origin;

      if (isOriginBreach) {
        throw new Error('Origin breach');
      }

      const isEventIdentified = event.data?.identifier === eventIdentifier;

      if (isEventIdentified) {
        // debouncing if type field doesn't exist or is unequal to CUSTOM_MESSAGE.
        // Other libraries leverage message listener as well.
        // If we don't add this condition, the listener will call every time a new message is received
        eventCallback(event.data);
      }

    });

  } catch (error) {
    console.error('Error while setting up message listener', error);
    throw error;
  }
}


/**
 * This method is to force a reload when page is loaded from back forward cache.
 * The page loaded from back forward cache may contain older data that may not be
 * relevant now. Example: theme change, authentication states etc.
 *
 * @remarks
 * A problem is caused by back-forward cache in Safari. It is supposed to
 * save complete state of page when user navigates
 * away. When user navigates back with back button page can
 * be loaded from cache very quickly. This is different
 * from normal cache which only caches HTML code.
 *
 * When page is loaded for bfcache onload event wont be triggered.
 * Instead you can check the persisted property of
 * the onpageshow event. It is set to false on initial page load.
 * When page is loaded from bfcache it is set to true.
 *
 * Currently not using this function in the projects. But keeping this here so
 * that again research is not required if such issue comes.
 *
 * This issue was with mobile Safari browsers earlier, but now seems to be fine.
 */
export function disableBackForwardCache() {
  try {
    if (typeof window !== 'undefined') {
      window.addEventListener('pageshow', reloadOnBackForward as EventListener);
    }

  } catch (error) {
    console.error('Error in disableBackForwardCache method: ', error);
  }
}


/**
 * This function triggers a reload if page is loaded through back forward cache in the browser
 *
 * @remarks
 * This is only used inside disableBackForwardCache method and not exported outside.
 * It checks a special condition which checks if the page load happened from
 * back forward cache, if yes, it reloads the page as the page loaded from back forward cache
 * may contain older data that may not be relevant now. Example: theme change, authentication states etc.
 *
 * @param event
 */
function reloadOnBackForward(event: PageTransitionEvent) {
  const historyTraversal = event.persisted ||
    (typeof window.performance !== 'undefined' &&
      window.performance.navigation.type === 2);

  if (historyTraversal) {
    // Handle page restore.
    window.location.reload();
  }
}
