import { checkIfStringIsEmpty } from './stringUtils';

import { FORM } from 'util/constants';
import EN_STRINGS from './en_strings';

export const validateFields = (name: string | undefined, pattern?: string) => {
  if (name === undefined || !checkIfStringIsEmpty(name)) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.REQUIRED,
    };
  }

  if (pattern === FORM.EMAIL) {
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

    if (!regexEmail.test(name)) {
      return {
        valid: false,
        message: EN_STRINGS.ERROR_MESSAGE.EMAIL,
      };
    }
  }

  if (pattern === FORM.PASSWORD) {
    const regexPassword = {
      capital: /[A-Z]/,
      lowercase: /[a-z]/,
      digit: /[0-9]/,
      character: /[!@#$%^&*]/,
      full: /^[A-Za-z0-9!@#$%^&*]{7,20}$/,
    };

    if (
      !regexPassword.capital.test(name) ||
      !regexPassword.lowercase.test(name) ||
      !regexPassword.digit.test(name) ||
      !regexPassword.character.test(name) ||
      !regexPassword.full.test(name)
    ) {
      return {
        valid: false,
        message: EN_STRINGS.ERROR_MESSAGE.PASSWORD,
      };
    }
  }

  return {
    valid: true,
  };
};
