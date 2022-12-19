import EN_STRINGS from 'translation/en';
import { EMAIL_REGEX } from 'util/regexUtils';

export const validate = (email: string) => {
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
