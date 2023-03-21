export const USER_ATTRIBUTES = {
  FirstName: 'first_name',
  UserEmail: 'email',
  PhoneNumber: 'phone'
} as const;


export const MAX_COUNT_CHECK = 35; // Keeping this number high as in case webengage is not loaded it tries to send multiple events and the countWebengageLoad and countGtmLoad value increases 4-5 times if it tries to load as we have initialized it to 1 and if this value is low then events would be missed
