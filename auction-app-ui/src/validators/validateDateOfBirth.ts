import { EN_STRINGS } from 'translation/en';
import { VALIDATION } from 'util/constants';

export const validate = (date: string) => {
  const dateOfBirth = new Date(date);

  const dateOfBirthYear = dateOfBirth.getFullYear();
  const dateOfBirthMonth = dateOfBirth.getMonth();
  const dateOfBirthDay = dateOfBirth.getDay();

  const currentDateYear = new Date().getFullYear();
  const currentDateMonth = new Date().getMonth();
  const currentDateDay = new Date().getDay();

  let diffInYears = currentDateYear - dateOfBirthYear;

  if (currentDateMonth < dateOfBirthMonth || (currentDateMonth === dateOfBirthMonth && currentDateDay < dateOfBirthDay)) {
    diffInYears--;
  }

  if (diffInYears < VALIDATION.DATE_OF_BIRTH_MIN) {
    return {
      valid: false,
      message: EN_STRINGS.ERROR_MESSAGE.DATE_OF_BIRTH,
    };
  }

  return {
    valid: true,
  };
};
