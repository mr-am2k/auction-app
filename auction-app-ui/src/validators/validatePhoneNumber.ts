import { EN_STRINGS } from 'translation/en';
import { VALIDATION } from 'util/constants';

export const validate = (phoneNumber: string) => {
  if (phoneNumber.length < VALIDATION.PHONE_NUMBER_MIN_LENGTH || phoneNumber.length > VALIDATION.PHONE_NUMBER_MAX_LENGTH) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.PHONE_NUMBER,
    };
  }

  return {
    valid: true,
  };
};
