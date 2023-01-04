import EN_STRINGS from 'translation/en';

export const validate = (date: string) => {
  const startDate = new Date(date);

  if (startDate < new Date()) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.START_DATE,
    };
  }

  return {
    valid: true,
  };
};
