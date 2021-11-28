import request from '@/utils/request'
/**
 * 登录获取token
 * @param {*} data {username,password}
 * @returns promise
 */
export function login (data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
export function user () {
  return request({
    url: '/user'
  })
}
