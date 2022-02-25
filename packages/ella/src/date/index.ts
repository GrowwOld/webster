/**
 * @module Date
 */

import dayjs from 'dayjs';

import { isEmpty } from '../general';

/**
 * This method can be used to get month name abbreviation from month number.
 *
 * @param {number} monthNumber - Month number, eg: for Jan, it is 1
 *
 * @remarks
 * monthNumber should be in the range of 1-12
 *
 * @example
 * ```
 * getMonthAbbrByIndex(2) // Feb will be the output
 * ```
 */
export function getMonthAbbrByIndex(monthNumber: number): string {
  if (monthNumber < 1 || monthNumber > 12) {
    return '';
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return monthNames[ monthNumber - 1 ];
}


/**
 * This function converts date input coming from backend (generally in long format (ex. '2022-02-01T12:16:13'))
 * to a specified format provided in 2nd paramter
 * It converts all types of dates accepted by dayjs
 *
 * @remarks
 * Link for dayjs format method - https://day.js.org/docs/en/display/format
 *
 * @param {Date} longDateValue - Date input to be converted to another format. This generally comes from backend and is
 * in long format. For example '2022-02-01T12:16:13'
 * @param {string} dateFormat - Format in which the date needs to be converted to.
 *
 * @example
 * ```
 * getDateInRequiredFormat('2022-02-01T12:16:13', 'DD MMM, hh:mm A');  // Output will be '01 Feb, 12:16 PM'
 * getDateInRequiredFormat('2022-01-28T12:54:40', 'DD MMM, hh:mm A');  // Output will be '28 Jan, 12:54 PM'
 * getDateInRequiredFormat('2022-01-25T12:08:12', 'DD MMM YYYY,  hh:mm A);  // Output will be '25 Jan 2022,  12:08 PM'
 * getDateInRequiredFormat('2021/11/20', 'YYYY-MM-DD');  // Output will be '2021-11-20'
 * getDateInRequiredFormat('21 Nov 2020', 'YYYY-MM-DD');  // Output will be '2020-11-21'
 * getDateInRequiredFormat('Fri Feb 04 2022 15:24:28 GMT+0530 (India Standard Time)', 'YYYY-MM-DD');  // Output will be '2022-02-04'
 * ```
 */
export function getDateInRequiredFormat(longDateValue: Date, dateFormat: string = 'DD MMM YYYY') {
  try {
    if (!isEmpty(dateFormat)) {
      const str = dayjs(longDateValue).format(dateFormat);

      if (str === 'Invalid Date') {
        return '';

      } else {
        return str;
      }
    }

  } catch (error) {
    console.error('Error in getDateInRequiredFormat: ', error);
  }
}


/**
 * This function returns age as a number from the date of birth as an input
 *
 * @param {Date} birthDate - birth date of a person in Date format
 *
 * @example
 * ```
 * getAgeFromDateOfBirth(new Date());  // Output is ''
 * getAgeFromDateOfBirth('Sun Oct 10 1993 05:30:00 GMT+0530 (India Standard Time)');  // Output is 28
 * getAgeFromDateOfBirth('1993-10-10');  // Output is 28
 * getAgeFromDateOfBirth();  // Output is ''
 * ```
 */
export function getAgeFromDateOfBirth(birthDate: Date) {
  try {
    const today = new Date();

    birthDate = new Date(birthDate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const isBirthdateYetToComeInCurrentYear = monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate());

    if (isBirthdateYetToComeInCurrentYear) {
      age--;
    }

    if (!isEmpty(age)) {
      return age;

    } else {
      return '';
    }

  } catch (error) {
    console.error('Error im getAgeFromDateOfBirth: ', error);
  }
}


/**
 * This method is used for getting previous month with same date to the date provided through argument.
 * Not doing with dayjs as no specific methods for this use case are there.
 *
 * @param {Date} date - Date in valid Date format
 * @param {number} monthCount - Number of months we want to go back to
 *
 * @example
 * ```
 * getPreviousMonthDate('Mon Mar 15 2021 10:21:35 GMT+0530 (India Standard Time)');  // Output will be 'Mon Feb 15 2021 10:21:35 GMT+0530 (India Standard Time)'
 * getPreviousMonthDate('1992-10-10');  // Output will be 'Thu Sep 10 1992 05:30:00 GMT+0530 (India Standard Time)'
 * getPreviousMonthDate(new Date());  // Output will be 'Tue Jan 04 2022 02:28:43 GMT+0530 (India Standard Time)'
 * getPreviousMonthDate('03/25/2015');  // Output will be 'Wed Feb 25 2015 00:00:00 GMT+0530 (India Standard Time)'
 * getPreviousMonthDate();  // Output will be 'Invalid date'
 * getPreviousMonthDate('03/31/2022');  // Output will be 'Thu Mar 03 2022 00:00:00 GMT+0530 (India Standard Time)'
 * getPreviousMonthDate(new Date(), 10); // Output will be 'Sun Apr 04 2021 15:18:48 GMT+0530 (India Standard Time)'. new Date() creates a
 * new instance of date and returns the current date. When this function was written current date was 4th Apr so output is that. If you write
 * it now date will be different.
 * ```
 */
export function getPreviousMonthDate(date: Date, monthCount: number = 1) {
  try {
    const newDate = new Date(date);

    newDate.setMonth(newDate.getMonth() - monthCount);

    return newDate;

  } catch (error) {
    console.error('Error in getPreviousMonthDate: ', error);
  }
}


/**
 * This method is used for getting previous date to the date provided through argument. argument should come through
 * only new Date()
 * Not doing with dayjs as no specific methods for this use case are there.
 *
 * @param {Date} date - Date as only new Date()
 * @param {number} date - number of days we want to go back to
 *
 * @example
 * ```
 * getPreviousDayDate(new Date());  // Output will be 'Thu Feb 03 2022 03:28:49 GMT+0530 (India Standard Time)'
 * ```
 */
export function getPreviousDayDate(date: Date, daysCount: number = 1) {
  try {
    const newDate = new Date(date);

    const newFinalDate = new Date(newDate.getTime() - (1000 * 60 * 60 * 24 * daysCount));

    return newFinalDate;

  } catch (error) {
    console.error('Error in getPreviousDayDate: ', error);
  }
}


/**
 * This function converts DD/MM/YYYY to YYYY-MM-DD.
 * JavaScript new Date() method accept date in YYYY-MM-DD or YYYY/MM/DD
 * format that's why we needed this method
 *
 * @remarks
 * This function is needed because dayjs does not work with 'DD/MM/YYYY' type of inputs
 *
 * @param {string} date - Input date string in DD/MM/YYYY or DD-MM-YYYY format
 *
 * @example
 * ```
 * convertStrToValidDateFormat('22/11/2021');  - // Output will be '2021-11-22'
 * convertStrToValidDateFormat('03/25/2015');  - // Output will be '2015-25-03'
 * convertStrToValidDateFormat('03-25-2015');  - // Output will be '2015-25-03'
 * ```
 */
export function convertStrToValidDateFormat(date: string) {
  try {
    const str = date.replace(/[^0-9]/g, '');

    if (str.length !== 8) {
      throw new Error('Error in converting date\'s format');
    }

    const result = str.slice(4, 8) + '-' + str.slice(2, 4) + '-' + str.slice(0, 2);

    return result;

  } catch (err) {
    console.error('Error in converting date\'s format', err);
    return '';
  }
}


/**
 * This function checks if input date is valid or not in this format 'YYYY-MM-DD'. We can also
 * validate dates in this format also 'YYYY/MM/DD' if we send '/' as 2nd parameter, or basically anything
 * as delimiter(2nd paramter).
 *
 * @remarks
 * One other way to check valid date is new Date(inputDate) but a limitation is leap year date in those.
 * Example: new Date('2022-2-29'); returns 'Tue Mar 01 2022 00:00:00 GMT+0530 (India Standard Time)' although
 * this should not be a valid date. This function returns false in such cases.
 *
 * @param {string} date - Input date in YYYY-MM-DD format
 * eg. 2021-11-22 (22nd November 2021)
 * @param {string} delimiter - Provide delimiter in case date uses
 * other delimiter than '-'.
 *  * eg. Pass '/' in case date is in format of YYYY/MM/DD
 *
 * @example
 * ```
 * isValidDate();  // Output is false
 * isValidDate('1993-10-10');  // Output is true
 * isValidDate('1993/10/10');  // Output is false
 * isValidDate('1993/10/10', '/');  // Output is true
 * isValidDate('10/10/1993', '/');  // Output is false
 * isValidDate('1907-10-10');  // Output is true
 * isValidDate('1707-10-10');  // Output is true
 * isValidDate('1000-10-10');  // Output is true
 * isValidDate('1-1-1');  // Output is true
 * isValidDate('1707-10-32);  // Output is false
 * isValidDate('2022-2-29');  // Output is false as 2022 is not a leap year
 * isValidDate('2020-2-29');  // Output is true as 2020 was a leap year
 * ```
 */
export function isValidDate(dateStr: string, delimiter: string = '-') {
  try {
    if (dateStr) {
      const bits = dateStr.split(delimiter);
      const date = new Date(Number(bits[ 0 ]), Number(bits[ 1 ]) - 1, Number(bits[ 2 ]));

      return date && (date.getMonth() + 1) === Number(bits[ 1 ]);

    } else {
      return false;
    }

  } catch (err) {
    console.error('Error in validating date', err);
    return false;
  }
}


/**
 * This function returns an array of objects which specify financial years from last supported year to offset
 * year from current financial year.
 *
 * @remarks
 * This function returns a list of UI data to be returned from a start year to end year (financial year data).
 * lastSupportedyear is the start year, and the end year is current year or if any offset is there, then end year is current year
 * minus offset. This function helps in showing a dropdown of all available financial years to choose from.
 * Mainly used in Reports section of the website.
 *
 * @param {number} lastSupportedYear - last year in number from which array of values needs to be returned
 * @param {number} offsetFromCurrentFinancialYear - offset from current year of the year upto which the values have to be returned
 *
 * @example
 * ```
 * getReportDateInput(2020, 1);  // Output will be [{startDate: 'Apr 2020', endDate: 'Mar 2021'}]
 * getReportDateInput(2020);  // Output will be [{startDate: 'Apr 2021', endDate: 'Mar 2022'}, {startDate: 'Apr 2020', endDate: 'Mar 2021'}]
 * ```
 */
export function getReportDateInput(lastSupportedYear: number, offsetFromCurrentFinancialYear: number = 0) {
  try {
    const dateInput = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentFinancialYear = currentMonth < 4
      ? currentYear - 1 - offsetFromCurrentFinancialYear
      : currentYear - offsetFromCurrentFinancialYear;

    for (let financialYear = currentFinancialYear; financialYear >= lastSupportedYear; financialYear--) {
      const dateEntry = {
        startDate: `Apr ${financialYear}`,
        endDate: `Mar ${financialYear + 1}`
      };

      dateInput.push(dateEntry);
    }

    return dateInput;

  } catch (error) {
    console.error('Report-date generation error:', error);
    return [];
  }
}


/**
 * This method inserts "/" while entering dates in input element
 *
 * @remarks
 * This function is called while user is inputting the date in an input
 * Not using input type as date for this use case as it forces us to use default date selector, and
 * we have created a custom date selector and hence the need for this function arises.
 *
 * @param {string} inputDate - string entered in input element
 *
 * @example
 * ```
 * formatDateWithBackSlash('121');  // Output will be '12/1'
 * formatDateWithBackSlash('12');  // Output will be '12/'
 * formatDateWithBackSlash('1');  // Output will be '1'
 * formatDateWithBackSlash('1213');  // Output will be '12/13'
 * formatDateWithBackSlash('12121212');  // Output will be '12/12/1212'
 * ```
 */
export function formatDateWithBackSlash(inputDate: string) {
  try {
    const str = inputDate.replace(/[^0-9]/g, '');
    const { length } = str;
    let result = str;

    if (length > 2) {
      if (length >= 4) {
        result = str.slice(0, 2) + '/' + str.slice(2, 4) + '/' + str.slice(4, length);

      } else {
        result = str.slice(0, 2) + '/' + str.slice(2, length);
      }

    } else if (length === 2) {
      result = str.slice(0, 2) + '/';
    }

    return result;

  } catch (error) {
    console.error('Error in formatDateWithBackSlash: ', error);

    return inputDate;
  }
}


/**
 * This method Checks whether date string is Valid Date of birth or not.
 *
 * @remarks
 * Doesn't check for Minor (Age < 18). Checks if age is lower than 120, also if date is valid (i.e, leap year validations,
 * no invalid month or date etc)
 * Validations :- isValidDate(no invalid months(ex. 13), dates (ex. 32), leap year violations , Future date,
 * formatted length = 10, age not more than 120.
 *
 * @param {string} inputDate - string entered in input element (ddmmyyyy or dd/mm/yyyy)
 *
 * @example
 * ```
 * dobValidationCheck('10/10/2000');  // Output will be true
 * dobValidationCheck('10/10/1500');  // Output will be false
 * ```
*/
export function dobValidationCheck(inputDob: string) {
  const formattedDOBStr = convertStrToValidDateFormat(inputDob);

  if (!isValidDate(formattedDOBStr)) {
    return false;
  }

  const formattedDOBDate = new Date(formattedDOBStr);
  const timeDifference = ((new Date().getTime()) - (formattedDOBDate.getTime())); //typeScript doesn't allow subtraction of Date.
  const age = getAgeFromDateOfBirth(formattedDOBDate) || 0;

  if (age > 120 || timeDifference < 0) {
    return false;
  }

  return true;
}


/** This method Checks whether Age is less than 18 or not.
 *
 * @param {string} dob - string entered in input element (ddmmyyyy or dd/mm/yyyy)
 *
 * @example
 * ```
 * isAgeMinor('10/10/1995');  // Output will be false
 * isAgeMinor('10/10/2020');  // Output will be true
 * ```
 * */
export function isAgeMinor(dob: string) {
  if (dob) {
    const formattedDOBStr = convertStrToValidDateFormat(dob);
    const formattedDOBDate = new Date(formattedDOBStr);

    if (isValidDate(formattedDOBStr)) {
      const age = getAgeFromDateOfBirth(formattedDOBDate) || 0;

      return age < 18;
    }
  }

  return false;
}
