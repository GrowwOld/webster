/**
 * @module Number
 */

import { isEmpty } from '../general';

export {
  NumberFormatter
} from './NumberFormatter';

/**
 * This method can be used to add commas as per Indian system to any valid number of type string or number.
 *
 * @param {number | string} x - Number that you want to be formatted with commas as per Indian system
 *
 * @remarks
 * It's strongly recommended to pass number only but method can also handle valid string.
 *
 * @example
 * ```
 * addingCommasToNumber(1)); // 1
 * addingCommasToNumber(11)); // 11
 * addingCommasToNumber(111)); // 111
 * addingCommasToNumber('-1111')); // -1,111
 * addingCommasToNumber('11111')); // 11,111
 * addingCommasToNumber(-111111)); // -1,11,111
 * ```
 */
export function addingCommasToNumber(x: number | string): string {
  // ensuring that x is a valid number be in a string type or number
  if (isEmpty(x) || isNaN(x as number)) {
    console.error('Unable to insert commas to the number -', x);
    return '';
  }

  let isNegativeNumber = false;

  x = x.toString();

  if (x.charAt(0) === '-') {
    x = x.substring(1);
    isNegativeNumber = true;
  }

  let afterPoint = '';

  if (x.indexOf('.') > 0) { afterPoint = x.substring(x.indexOf('.'), x.length); }

  x = Math.floor(x as any as number);
  x = x.toString();
  let lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);

  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }

  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;

  if (isNegativeNumber) {
    return '-' + res;

  } else {
    return res;
  }
}


/**
 * This method can be used to validate 10 digit mobile number.
 *
 * @param {number | string} mobNumber - Mobile number that you want to validate
 *
 * @remarks
 * It's strongly recommended to pass number only but method can also handle valid string.
 *
 * @example
 * ```
 * isValidMobileNumber(1234567890) // true
 * isValidMobileNumber(-1234567890) // false
 * isValidMobileNumber(123) // false
 * isValidMobileNumber("123") // false
 * isValidMobileNumber("1234567890") // true
 * isValidMobileNumber("-1234567890") // false
 * ```
 */
export function isValidMobileNumber(mobNumber: number | string) {
  if (isNaN(mobNumber as number)) {
    return false;
  }

  const numberFormat = /^\d{10}$/;

  return numberFormat.test(mobNumber as any as string);
}


/**
 * This method can be used to convert paisa to rupees
 *
 * @param {number} value - Number that you want to be converted to rupee
 *
 * @remarks
 * Paise cannot be in decimal, so make sure you pass integer else it will return argument only without any change
 *
 * @example
 * ```
 * convertPaisaToRupee(100)); // 1
 * ```
 */
export function convertPaisaToRupee(value: number) {
  if (Number.isInteger(value)) { // Paisa cannot be in decimal
    return parseFloat(value as any as string) / 100;

  } else {
    console.error('Paisa cannot be in decimal');
    return value;
  }
}

/**
 * This method can be used to convert rupees to paisa
 *
 * @param {number} value - Number that you want to be converted to paise
 *
 * @example
 * ```
 * convertRupeeToPaisa(1)); // 100
 * ```
 */
export function convertRupeeToPaisa(value: number) {
  return parseFloat(value as any as string) * 100;
}


/**
 * This method can be used to find ordinal suffix of any number.
 *
 * @param {number} num - Number that you want to find ordinal suffix of
 *
 * @example
 * ```
 * ordinalSuffixOfNumber(1); // 1st
 * ordinalSuffixOfNumber(11); // 11th
 * ordinalSuffixOfNumber(21); // 21st
 * ordinalSuffixOfNumber(101); // 103rd
 * ```
 */
export function ordinalSuffixOfNumber(num: number): string {
  const j = (num % 10),
    k = (num % 100);

  if (j === 1 && k !== 11) {
    return num + 'st';
  }

  if (j === 2 && k !== 12) {
    return num + 'nd';
  }

  if (j === 3 && k !== 13) {
    return num + 'rd';
  }

  return num + 'th';
}


/**
 * This method can be used to add commas as per million format (thousands separator).
 *
 * @param {number | string} num - Number that you want to be formatted with commas
 *
 * @remarks
 * It returns the number as it is on error
 *
 * @example
 *
 * ```
 * millionWithCommas(1030120313); // 1,030,120,313
 * millionWithCommas(1000001); // 1,000,001
 * millionWithCommas(1000001.12432432); // 1,000,001.12432432
 * ```
 */
export function millionWithCommas(num: number | string) {
  try {
    // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const parts = num.toString().split('.');

    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');

  } catch (err) {
    console.error('Error in adding commas in millions: ', err);
    return num;
  }
}


/**
 * This method can be used to get a random integer number between 2 number both inclusive.
 *
 * @param {number} min - Starting number
 * @param {number} max - Ending number
 *
 * @example
 * ```
 * getIntegerRandomNoBetweenTwoNo(0,500)); // will return anything between 0 to 500
 * ```
 */
export function getIntegerRandomNoBetweenTwoNo(min: number, max: number) { // min, max inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * This method can be used to convert the number in lakhs and crore format.
 *
 * @param {number | string} number - Number that you want to format for lakh or crore.
 * @param {number} toFixed - how much decimal places you need after decimal, default is set as 2.
 *
 * @remarks
 * It returns the number as it is on error ,empty string, null, undefined, NaN is passed.
 *
 * @example
 *
 * ```
 * changeFormatToLakhCrore(103213456); // 10.32Cr
 * changeFormatToLakhCrore('1034564'); // 10.35L
 * changeFormatToLakhCrore('1027654',3); // 10.277L
 * ```
 *
 */
export function changeFormatToLakhCrore(num: string | number, toFixedDecimals: number = 2) {
  try {
    if (isEmpty(num) || isNaN(num as number)) {
      console.error('Unable to convert number in lakhs and crores');

      return num;
    }

    const sign = Math.sign(Number(num));
    const noOfLakhs = Math.abs(+(Number(num) / 100000));

    if (isNaN(noOfLakhs)) {
      console.error('NaN error ');

      return num;
    }

    let displayStr = String(num);
    const finalLakhs = noOfLakhs * sign;

    if (noOfLakhs >= 1 && noOfLakhs <= 99) {
      const toFixDisplayVal = finalLakhs.toFixed(toFixedDecimals);

      displayStr = `${toFixDisplayVal}L`;

    } else if (noOfLakhs >= 100) {
      const crores = (finalLakhs / 100).toFixed(toFixedDecimals);

      displayStr = `${crores}Cr`;
    }

    return displayStr;

  } catch (err) {
    console.error('Error in formatting number in lakhs and crore : ', err);
    return num;
  }
}


/**
 * This method can be used to convert the number in thousand,million,billion and trillion format.
 *
 * @param {number | string} number - Number that you want to format for in billion trillon Intl format.
 * @param {number} toFixed - how much decimal places you need after decimal, default is set as 2.
 *
 * @remarks
 * It returns the number as it is on error ,empty string, null, undefined, NaN is passed.
 *
 * @example
 *
 * ```
 * convertToBillionTrillionFormat(3098100000); // 3.09B
 * convertToBillionTrillionFormat(2849537600000); // 2.84T
 * convertToBillionTrillionFormat(12200000); // 12.20M
 * convertToBillionTrillionFormat(100232332,3); // 100.232M
 * convertToBillionTrillionFormat('100232332'); // 100.23M
 * ```
 *
 */
export function convertToBillionTrillionFormat(num: string | number, toFixedDecimals: number = 2) {
  try {
    if (isEmpty(num) || isNaN(num as number)) {
      console.error('Unable to convert number in billion trillon Intl format');

      return num;
    }

    const toNumber = Number(num);
    const abbrev = [ 'K', 'M', 'B', 'T' ];
    const numberToString = toNumber.toLocaleString('en-US');
    const splitNumberByCommaArr = numberToString.split(',');

    const splitNumberArrLength = splitNumberByCommaArr.length;

    if (splitNumberArrLength <= 1) {
      return num;
    }

    const unitPlace = splitNumberArrLength - 2 < abbrev.length ? abbrev[splitNumberArrLength - 2] : '';

    if (isEmpty(unitPlace)) {
      const finalNumber = Number(numberToString).toFixed(toFixedDecimals);

      return finalNumber;

    } else {
      const numberBeforeDecimal = Number(splitNumberByCommaArr[0]);
      const numberAfterDecimal = splitNumberByCommaArr[1];

      if (toFixedDecimals <= 0) {
        return numberBeforeDecimal + unitPlace;
      }

      const sliceNumberAfterDecimal = numberAfterDecimal.slice(0, toFixedDecimals);
      const result = `${numberBeforeDecimal}.${sliceNumberAfterDecimal}${unitPlace}`;

      return result;
    }


  } catch (err) {
    console.error('Error in formatting number in billion trillon Intl format : ', err);
    return num;
  }
}


/**
 * This method can be used to give the sign of the number : + , - or empty if 0.
 *
 * @param {number | string} num - Number that you want to get sign for.
 *
 * @remarks
 * It returns empty (No sign) for 0 value.
 *
 * @example
 *
 * ```
 * getNumberSign(1000); // '+'
 * getNumberSign('1200'); // '+'
 * getNumberSign(-12430); // '-'
 * getNumberSign(0); // ''
 * ```
 *
 */
export function getNumberSign(num: string | number) {
  try {
    const toNumber = Number(num);

    const mathSign = Math.sign(toNumber);

    if (mathSign === 1) {
      return '+';

    } else if (mathSign === -1) {
      return '-';
    }

    return '';

  } catch (err) {
    console.error(err);

    return '';
  }
}


/**
 * This method fixes the decimal part but without round off the value.
 *
 *
 * @param {number | string} num - number entered in input element
 * @param {number} toFixedDecimal - Number of decimal places you want to fix the decimal part to.
 *
 * @example
 * ```
 * toFixedWithoutRounding(1.56789,4) => 1.5678
 * ```
 */
export function toFixedWithoutRounding(num: number | string, toFixedDecimal: number) {
  try {

    if (!num) {
      return num;
    }

    let number = num.toString();

    const decimalIndex = number.indexOf('.');

    if (decimalIndex === -1 || toFixedDecimal < 0) {
      return number;
    }

    return number.slice(0, (decimalIndex + (toFixedDecimal + 1)));

  } catch (err) {
    console.error('Error in rounding off number ', err);

    return num;
  }
}
