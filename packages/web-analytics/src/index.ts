import { getDeviceDetails } from '@groww-tech/ella';
import { USER_ATTRIBUTES, MAX_COUNT_CHECK } from './constants';

const browserDetailsObject: any = getDeviceDetails();
let countWebengageLoad = 1;
let countGtmLoad = 1;
const webengage: any = null;
const dataLayer: any = null;


/**
 * This function will send event to webengage and gtm as of now but any new analytics tool if integrated once added here will send event to that tool also
 *
 * @param category This is used to identify the category of the event
 * @param eventName The name of the event that needs to be sent to either webengage or gtm
 * @param properties Additional properties that need to be sent for analytics
 *
 *
 *  @example
 *  ```
 *  const eventproperties = {
 *    userName: 'John Doe'
 *  }
 *
 *  trackEvent('Dev', 'PageView');
 *  trackEvent('Dev', 'PageView', eventProperties);     //If you need to send any custom event properties
 *
 *  ```
 */
export function trackEvent(category: string, eventName: string, properties?: object) {
  // sending event to browsing history and webengage and gtm
  try {
    const newProperties = {
      ...properties,
      origin: browserDetailsObject.origin
    };

    // sending event to webengage
    sendEventToWebengage(eventName, newProperties);

    // sending event to gtm
    sendEventToGtm(eventName, newProperties, category);

  } catch (e) {
    console.error('Exception trackEvent', e);
  }
}


/**
 *
 * @param eventName The name of the event that needs to be sent to webengage
 * @param properties Additional properties that need to be sent for analytics
 */
function sendEventToWebengage(eventName: string, properties: object) {
  if (typeof webengage !== 'undefined') {
    //This is the webengage API to send event name and properties
    webengage.track(eventName, properties);

  } else {
    //This block will keep calling itself after every 1sec till webengage doesn't get loaded
    if (countWebengageLoad <= MAX_COUNT_CHECK) {
      countWebengageLoad++;
      setTimeout(() => sendEventToWebengage(eventName, properties), 1000);
    }
  }
}


/**
 *
 * @param eventName The name of the event that needs to be send to gtm
 * @param properties The name of the event that needs to be sent to gtm
 * @param category This is used to identify the category of the event
 */
function sendEventToGtm(eventName: string, properties: object, category: string) {

  if (typeof dataLayer !== 'undefined') {
    // Pushing these events to datalayer
    dataLayer.push({
      event: 'event',
      eventCategory: category,
      eventAction: eventName,
      eventLabel: JSON.stringify(properties)
    });

  } else {
    //This block will keep calling itself after every 1sec till gtm doesn't get loaded
    if (countGtmLoad <= MAX_COUNT_CHECK) {
      countGtmLoad++;
      setTimeout(() => sendEventToGtm(eventName, properties, category), 1000);
    }
  }

}


/**
 * This function helps in identifying the attributes, events nd session info accumulated that are created associated to an anonymous user that is created by default. Once logged in all of this stored information is attributed to this identified user
 *
 *
 * @param name This is used to identify the name of the logged in user
 * @param emailId This is the emailId which tells the emailId of the logged in user
 * @param thirdPartyId This is the unique id which we send which maps it to a specific user
 * @param phoneNumber This is the phone number of the user
 *
 *
 * @example
 * ```
 * identifyLoggedInUser('John Doe', 'johndoe@gmail.com', 'test123', '9876543210')
 * ```
 */
export function identifyLoggedInUser(name: string, emailId: string, thirdPartyId = '', phoneNumber = '') {
  if (typeof webengage !== 'undefined') {
    if (webengage.user) {

      //By calling the webengage's login method all of this stored information is attributed to this identified user.
      webengage.user.login(thirdPartyId);

      updateAttributeInWebengage(USER_ATTRIBUTES.FirstName, name);
      updateAttributeInWebengage(USER_ATTRIBUTES.UserEmail, emailId);
      updateAttributeInWebengage(USER_ATTRIBUTES.PhoneNumber, phoneNumber);
    }

  } else {
    if (countWebengageLoad <= MAX_COUNT_CHECK) {
      countWebengageLoad++;
      setTimeout(() => identifyLoggedInUser(name, emailId, thirdPartyId, phoneNumber), 1000);
    }
  }
}


/**
 * This function provides setters for assigning values against each attribute for the users. These attributes can be used to segment users, configure campaign targeting and personalize messages sent through each channel of engagement.
 *
 *
 * @param attribute This is the string which sets the attribute that you want to set
 * @param value This is the string which sets the value against the attribute that you want to set
 *
 *
 *  * @example
 * ```
 * updateUserAttribute('first_name', 'John Doe');
 * ```
 */
export function updateUserAttribute(attribute: string, value: string) {
  updateAttributeInWebengage(attribute, value);
}


/**
 *
 * @param attribute This is the string which sets the attribute that you want to set
 * @param value This is the string which sets the value against the attribute that you want to set
 *
 */
function updateAttributeInWebengage(attribute: string, value: string) {
  if (typeof webengage !== 'undefined') {
    if (webengage.user) {
      //Webengage provides a setter for assigning values against each attribute for the users
      webengage.user.setAttribute(attribute, value);
    }

  } else {
    if (countWebengageLoad <= MAX_COUNT_CHECK) {
      countWebengageLoad++;
      setTimeout(() => updateAttributeInWebengage(attribute, value), 1000);
    }
  }
}
