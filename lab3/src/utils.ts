import { Locator, By } from 'selenium-webdriver';

import { ALPHABET } from './config';
import { User } from './types';

export const XPathLocatorForInput = (name: string): Locator => {
  return By.xpath(`//*[@formcontrolname='${name}']`);
};

const randInt = (from: number, to: number): number => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

const randVal = <T>(values: ArrayLike<T>): T => {
  return values[randInt(0, values.length - 1)];
};

const generateString = (
  lengthFrom: number,
  lengthTo: number,
  alphabet: string = ALPHABET,
): string => {
  const length = randInt(lengthFrom, lengthTo);
  return Array.from<string>({ length }).reduce(
    (res: string) => res + randVal(alphabet),
    '',
  );
};

export const generateUser = (): User => ({
  firstName: generateString(5, 10),
  lastName: generateString(5, 10),
  login: generateString(5, 20),
  password: generateString(5, 20),
});
