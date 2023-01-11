import { EN_STRINGS } from 'translation/en';
import { VALIDATION } from 'util/constants';

export const validate = (cardNumber: string) => {
  if (cardNumber.length !== VALIDATION.CARD_NUMBER_REQUIRED_LENGTH) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.CARD_NUMBER,
    };
  }

  return {
    valid: true,
  };
};
