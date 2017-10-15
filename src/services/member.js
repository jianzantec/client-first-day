import { get, post } from '../utils/request'; // eslint-disable-line

// 登陆
export function login(payload) {
  return post('/api/v1/members/login.json', payload);
}

// 注册
export function reg(payload) {
  return post('/api/v1/members.json', payload);
}

// 获取用户信息
export function getMemberInfo(payload) {
  return get(`/api/v1/members/${payload.id}.json`, payload);
}
