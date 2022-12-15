export const checkIfStringIsEmpty = (text: string | undefined) => {
  if (text === undefined && text!.length) {
    return true;
  }
  return false;
};
