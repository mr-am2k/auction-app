import EN_STRINGS from 'translation/en';

export const validate = (phoneNumber: string) => {
  if (phoneNumber.length <5 || phoneNumber.length >15 ) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.PHONE_NUMBER,
    };
  }

  return {
    valid: true,
  };
};
