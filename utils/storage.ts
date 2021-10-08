export const setJSON = (key: string, val: any) =>
  localStorage.setItem(key, JSON.stringify(val));

export const getJSON = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
};

export const get = (key: string) => localStorage.getItem(key);

export const set = (key: string, data: string) => localStorage.setItem(key, data);

export const remove = (key: string) => localStorage.removeItem(key);

const storage = {
  get,
  set,
  remove,
  setJSON,
  getJSON,
};

export default storage;
