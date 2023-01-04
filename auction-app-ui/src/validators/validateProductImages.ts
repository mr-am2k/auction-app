import EN_STRINGS from 'translation/en';

export const validate = (images: string[]) => {
  if (images.length < 3) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.PRODUCT_IMAGES,
    };
  }

  return {
    valid: true,
  };
};
