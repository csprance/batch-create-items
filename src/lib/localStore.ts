import * as store from 'store';

export const storeAndReturn = <A>(key: string, value: A): A => {
  store.set(key, value);
  return value;
};

export const getFromStore = (key: string, defaultValue: any): any => {
  const val = store.get(key);
  if (val) {
    return val;
  }
  return defaultValue;
};
