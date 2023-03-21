import { expect, test } from 'vitest';
import { encryptAes, decryptAes } from '../index';


//This secret key is just for testing purpose
// eslint-disable-next-line
const SECRET_KEY = 'TEST_SECRET_KEY';

const stringToEncrypt = 'some random string';

const objectToEncrypt = {
  name: 'John Doe',
  age: 25
};

/*
We are passing the two arguments to our test cases
1. The data that needs to be encrypted
2. The response from encryptAes function which in turn gives us object with keys {data and error}


We are then passing the data from response from encryptAes function to decryptAes function which
in turn gives us object with keys {data and error}

We are then comparing the data from the response of decryptAes function with the original data

We are also checking if the error key is null in both the response objects from encryptAes
*/
test.each([
  [ stringToEncrypt, encryptAes(stringToEncrypt, SECRET_KEY) ],
  [ objectToEncrypt, encryptAes(objectToEncrypt, SECRET_KEY) ]


])('Check if decryption of the encrypted data is equal to the original data',
  (expected, encryptedApiResponse) => {
    const decryptApiResponse = decryptAes(encryptedApiResponse.data, SECRET_KEY);

    expect(decryptApiResponse.data).toEqual(expected);
    expect(decryptApiResponse.error).toBeNull();
    expect(encryptedApiResponse.error).toBeNull();

  });
