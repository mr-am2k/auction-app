import EN_STRINGS from 'translation/en';

export const validate = (cardCVV: string) => {
  if (cardCVV.length !== 3) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.CARD_CVV,
    };
  }

  return {
    valid: true,
  };
};
