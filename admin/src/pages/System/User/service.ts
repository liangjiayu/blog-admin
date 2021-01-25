import { request } from 'umi';

export async function getUserList(params) {
  return request('/api/user/list', { method: 'POST', data: params });
}

export async function addUser(params) {
  return request('/api/user/create', { method: 'POST', data: params });
}

export async function delUser(params) {
  return request('/api/user/del', { method: 'POST', data: params });
}

export async function updateUser(params) {
  return request('/api/user/update', { method: 'POST', data: params });
}
