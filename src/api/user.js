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
/**
 *发布房屋
 * @param {*} data {title, description, houseImg, oriented, supporting, price, roomType, size, floor, community}
 * @returns
 */
export function
uploadHouses (data) {
  return request({
    url: '/user/houses',
    method: 'POST',
    data
  })
}
/**
 *已发布的房源
 * @returns
 */
export function upHouses () {
  return request({
    url: '/user/houses'
  })
}
/**
 *添加收藏
 * @param {*} id {code}
 * @returns
 */
export function addFavorites (id) {
  return request({
    url: `/user/favorites/${id}`,
    method: 'POST'
  })
}
/**
 *删除房屋收藏
 * @param {*} id  {code}
 * @returns
 */
export function deleteFavorites (id) {
  return request({
    url: `/user/favorites/${id}`,
    method: 'DELETE'
  })
}
