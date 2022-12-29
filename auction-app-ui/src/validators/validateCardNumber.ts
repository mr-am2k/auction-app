import EN_STRINGS from 'translation/en';

export const validate = (cardNumber: string) => {
  if (cardNumber.length !== 16) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.CARD_NUMBER,
    };
  }

  return {
    valid: true,
  };
};
