import { EN_STRINGS } from 'translation/en';
import { VALIDATION } from 'util/constants';

export const validate = (cardCVV: string) => {
  if (cardCVV.length !== VALIDATION.CVV_REQUIRED_LENGTH) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.CARD_CVV,
    };
  }

  return {
    valid: true,
  };
};
