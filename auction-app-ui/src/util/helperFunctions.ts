import EN_STRINGS from './en_strings';
import { EMAIL_REGEX, PASSWORD_REGEX } from './regex';

export const validateEmail = (email: string) => {
  console.log(EMAIL_REGEX.test(email));
  if (!EMAIL_REGEX.test(email)) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.EMAIL,
    };
  }

  return {
    valid: true,
  };
};

export const validatePassword = (password: string) => {
  if (
    !PASSWORD_REGEX.capital.test(password) ||
    !PASSWORD_REGEX.lowercase.test(password) ||
    !PASSWORD_REGEX.digit.test(password) ||
    !PASSWORD_REGEX.character.test(password) ||
    !PASSWORD_REGEX.full.test(password)
  ) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.PASSWORD,
    };
  }

  return {
    valid: true,
  };
};
