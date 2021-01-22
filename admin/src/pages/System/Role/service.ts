import { getStore, setStore } from '@/utils/session';

export const getRoleList = () => {
  return getStore('roleList') || [];
};

export const delRoleItem = (data) => {
  const roleList = getStore('roleList') || [];
  const index = roleList.findIndex((i) => {
    return i.id === data.id;
  });
  roleList.splice(index, 1);
  setStore('roleList', roleList);
};

export const addRoleItem = (data) => {
  const roleList = getStore('roleList') || [];
  roleList.push({ ...data, id: new Date().getTime() });
  setStore('roleList', roleList);
};

export const putRoleItem = (data) => {
  const roleList = getStore('roleList') || [];
  const current = roleList.find((i) => {
    return i.id === data.id;
  });
  Object.assign(current, data);
  setStore('roleList', roleList);
};
