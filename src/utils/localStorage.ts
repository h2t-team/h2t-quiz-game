import { compareDate } from './date';

export const setItem = (key: string, value: string, expireIn = 0) => {
  const current = new Date(0);
  current.setUTCSeconds(expireIn);
  const item = expireIn ? { value, expireIn: current } : { value };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getItem = (key: string) => {
  const value = localStorage.getItem(key) || '';
  try {
    const item = JSON.parse(value);
    const expireIn = item?.expireIn;
    if (expireIn && compareDate(new Date(expireIn), new Date()) === -1) {
      localStorage.removeItem(key);
      return null;
    }

    return item?.value;
  } catch (error) {
    return value;
  }
};
