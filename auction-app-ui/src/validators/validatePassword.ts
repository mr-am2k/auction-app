import { EN_STRINGS } from 'translation/en';
import { PASSWORD_REGEX } from 'util/regexUtils';

export const validate = (password: string) => {
  if (
    ![PASSWORD_REGEX.capital, PASSWORD_REGEX.lowercase, PASSWORD_REGEX.digit, PASSWORD_REGEX.character, PASSWORD_REGEX.full].every(regex =>
      regex.test(password)
    )
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
