import { expect, test } from 'vitest';
import { encryptAes, decryptAes } from '../index';

const SECRET_KEY = 'TEST_SECRET_KEY';

const stringToEncrypt = 'some random string';

const objectToEncrypt = {
  name: 'John Doe',
  age: 25
};

test.each([
  [ stringToEncrypt, encryptAes(stringToEncrypt, SECRET_KEY) ],
  [ objectToEncrypt, encryptAes(objectToEncrypt, SECRET_KEY) ]


])('Check if decrption of the encrypted data is equal to the original data',
  (expected, encryptedApiResponse) => {
    const decryptApiResponse = decryptAes(encryptedApiResponse.data, SECRET_KEY);

    expect(decryptApiResponse.data).toEqual(expected);
    expect(decryptApiResponse.error).toBeNull();
    expect(encryptedApiResponse.error).toBeNull();

  });
