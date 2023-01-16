export const storageService = {
  add: (key: string, value: string) => localStorage.setItem(key, value),

  get: (key: string) => {
    return localStorage.getItem(key) !== null ? localStorage.getItem(key) : '';
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },

  removeAll: (listOfKeys: string[]) => {
    listOfKeys.forEach((key: string) => {
      localStorage.removeItem(key);
    });
  },

  clear: () => {
    localStorage.clear();
  },
};
