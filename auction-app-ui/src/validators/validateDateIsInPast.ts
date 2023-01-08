import EN_STRINGS from 'translation/en';

export const validate = (startDate: string, endDate?: string) => {
  let start: Date;
  let end: Date;

  if (endDate) {
    start = new Date(startDate);
    end = new Date(endDate);
  } else {
    start = new Date();
    end = new Date(startDate);
  }

  if (end < start) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.DATE,
    };
  }

  return {
    valid: true,
  };
};
