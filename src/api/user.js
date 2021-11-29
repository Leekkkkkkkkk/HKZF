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
/**
 * 获取个人资料
 * @returns {}
 */
export function user () {
  return request({
    url: '/user'
  })
}
/**
 *收藏列表
 * @returns
 */
export function favorites () {
  return request({
    url: '/user/favorites'
  })
}
/**
 * 确认是否收藏
 * @param {*} id {true,false}
 * @returns
 */
export function favoritesTr (id) {
  return request({
    url: `/user/favorites/${id}`
  })
}
