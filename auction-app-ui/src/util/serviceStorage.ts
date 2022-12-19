export const serviceStorage = {
  add: (key: string, value: string) =>
    localStorage.setItem(key, value),

  get: (key: string) => {
    return localStorage.getItem(key) !== null ? localStorage.getItem(key) : '';
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
