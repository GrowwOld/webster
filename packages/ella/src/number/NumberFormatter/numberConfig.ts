import {
  CURRENCY_NAME,
  AMOUNT_FALLBACK_STR,
  DAY_CHANGE_PERC_FALLBACK
} from './constants';


export const DAY_CHANGE_PERC_ABS = {
  fallback: DAY_CHANGE_PERC_FALLBACK,
  absoluteValue: true
};


export const PRICE_CURRENCY_FALLBACK_ZERO = {
  isCurrency: true,
  fallback: AMOUNT_FALLBACK_STR
};


export const PRIMARY_FALLBACK = {
  fallback: 0
};

export const FALLBACK_ZERO_TO_FIXED_TWO = {
  fallback: '0.00'
};


export const PLAIN_NUMBER = {
  plainNumber: true
};


export const NO_COMMAS = {
  addCommas: false
};


export const PRICE_CURRENCY_TO_FIXED_ZERO = {
  isCurrency: true,
  absoluteValue: true,
  toFixedValue: 0
};


export const PRICE_CURRENCY = {
  isCurrency: true
};


export const FIXED_ZERO = {
  toFixedValue: 0
};

export const CONVERT_TO_LAKH_CRORE = {
  formatToLakhCrore: true
};


export const PRICE_CURRENCY_USD = {
  isCurrency: true,
  currency: CURRENCY_NAME.USD
};

export const CONVERT_TO_BILLION_TRILLION = {
  formatToBillionTrillion: true
};

export const CURRENCY_CONVERT_TO_RUPEE = {
  isCurrency: true,
  formatPaisaToRupee: true
};

export const SIGN_SPACE_BETWEEN_SIGN_VALUE = {
  withSign: true,
  spaceBetweenSignValue: true
};
