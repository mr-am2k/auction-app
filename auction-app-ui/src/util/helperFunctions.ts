export const checkIfStringIsEmpty = (text: string | undefined) => {
  if (text === undefined && text!.length) {
    return true;
  }
  return false;
};

export const generateRandomId = () => {
  let uuid = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  return uuid() + uuid() + '-' + uuid() + '-' + uuid() + '-' + uuid() + '-' + uuid() + uuid() + uuid();
}

