import EN_STRINGS from 'translation/en';

export const validate = (date: string) => {
  const expirationDate = new Date(date);

  const expirationDateYear = expirationDate.getFullYear();
  const expirationDateMonth = expirationDate.getMonth();
  const expirationDateDay = expirationDate.getDay();

  const currentDateYear = new Date().getFullYear();
  const currentDateMonth = new Date().getMonth();
  const currentDateDay = new Date().getDay();

  let diffInYears = expirationDateYear - currentDateYear;

  if (
    expirationDateMonth < currentDateMonth ||
    (expirationDateMonth === currentDateMonth &&
      expirationDateDay < currentDateDay)
  ) {
    diffInYears--;
  }

  if (diffInYears < 1) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.CARD_EXPIRATION_DATE,
    };
  }

  return {
    valid: true,
  };
};
