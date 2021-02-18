import { request } from 'umi';

// 用户登录
export async function userLogin(data) {
  return request('/api/user/login', { method: 'POST', data });
}

// 获取用户信息
export async function getInfoByToken(params) {
  return request('/api/user/getInfoByToken', { method: 'POST', data: params });
}
