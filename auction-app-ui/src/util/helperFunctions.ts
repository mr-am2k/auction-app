import { User } from 'models/user';

export const checkIfStringIsEmpty = (text: string) => {
  if (!text.length) {
    return true;
  }
  return false;
};