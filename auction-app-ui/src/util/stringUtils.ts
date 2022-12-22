export const isEmptyString = (text: string | undefined) => {
  if (text !== undefined) {
    if (text!.length) {
      return true;
    }
  }
  return false;
};
