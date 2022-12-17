export const serviceStorage = {
  addInStorage: (key: string, value: string) =>
    localStorage.setItem(key, value),

  getFromStorage: (key: string) => {
    return localStorage.getItem(key);
  },

  removeFromStorage: (key: string) => {
    localStorage.removeItem(key);
  },
};
