const isEmpty = (object: {}) => {
  if (!Object.keys(object).length) {
    return true;
  }
  return false;
};

export default isEmpty;
