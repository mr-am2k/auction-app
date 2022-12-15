export const checkIfStringIsEmpty = (text: string | undefined) => {
  if (text !== undefined) {
    if (text!.length) {
      return true;
    }
  }
  return false;
};
