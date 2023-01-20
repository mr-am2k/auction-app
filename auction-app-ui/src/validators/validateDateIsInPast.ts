import { EN_STRINGS } from 'translation/en';

// TODO: update in future
export const validate = (firstDate: string, secondDate?: string) => {
  let startDate: Date;
  let endDate: Date;

  if (secondDate) {
    startDate = new Date(firstDate);
    endDate = new Date(secondDate);
  } else {
    startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 10);
  
    endDate = new Date(firstDate);
    endDate.setHours(startDate.getHours())
    endDate.setMinutes(startDate.getMinutes() + 1)
    endDate.setSeconds(startDate.getSeconds())
  }


  return endDate < startDate ? { valid: false, message: EN_STRINGS.ERROR_MESSAGE.DATE } : { valid: true };
};
