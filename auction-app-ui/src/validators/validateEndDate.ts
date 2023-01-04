import EN_STRINGS from 'translation/en';

export const validate = (date: string, date2?: string) => {
  const endDate = new Date(date);

  if (date2 === undefined && date !== undefined) {
    return {
      valid: true,
    };
  }

  const startDate = new Date(date2!);

  if (endDate < startDate) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.END_DATE,
    };
  }

  return {
    valid: true,
  };
};
