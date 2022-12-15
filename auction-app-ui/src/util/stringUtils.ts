export const checkIfStringIsEmpty = (text: string | undefined) => {
  console.log(text);
  console.log(text!==undefined)
  if (text !== undefined) {
    if (text!.length) {
      return true;
    }
  }
  return false;
};
