import EN_STRINGS from 'translation/en';
import { VALIDATION } from 'util/constants';
import { EMAIL_REGEX } from 'util/regexUtils';

export const validate = (email: string) => {
  if (!EMAIL_REGEX.test(email)) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.EMAIL,
    };
  }

  if (email.length > VALIDATION.EMAIL_MAX_LENGTH) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.EMAIL_LENGTH,
    };
  }

  return {
    valid: true,
  };
};
