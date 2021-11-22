const parseJSON = <T>(value: string | null): T | undefined => {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('parsing error on', { value });
    return undefined;
  }
};

export const setJSON = (key: string, val: any) =>
  localStorage.setItem(key, JSON.stringify(val));

export const getJSON = <T>(key: string): T | undefined => {
  const value = localStorage.getItem(key);
  if (value) {
    return parseJSON<T>(value);
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
