import request from '@/utils/request'
/**
 * 登录
 * @param {*} data {username,password}
 * @returns
 */
export function login (data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
