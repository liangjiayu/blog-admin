export const getStore = (key) => {
  if (!key) {
    return false;
  }
  const data = window.localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return false;
};

export const setStore = (key, value) => {
  if (!key || !value) {
    return;
  }
  const data = JSON.stringify(value);
  window.localStorage.setItem(key, data);
};

export const removeSession = (key) => {
  if (!key) {
    return;
  }
  window.sessionStorage.removeItem(key);
};
