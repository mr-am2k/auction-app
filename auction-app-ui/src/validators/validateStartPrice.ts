import EN_STRINGS from 'translation/en';

export const validate = (price: string) => {
  if (Number(price) < 1) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.START_PRICE,
    };
  }

  return {
    valid: true,
  };
};
