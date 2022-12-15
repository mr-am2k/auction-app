import { checkIfStringIsEmpty } from './stringUtils';

export const validateFields = (name: string) => {
  if (!checkIfStringIsEmpty(name)) {
    return {
      valid: false,
      message: 'The field is required',
    };
  }

  return {
    valid: true,
  };
};
