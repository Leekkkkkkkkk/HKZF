import request from '@/utils/request'
// 发起请求获取轮播图
/**
 * 轮播图
 * @returns img
 */
export function swiper () {
  return request({
    url: '/home/swiper'
  })
}
/**
 *租房小组
 * @param {*} params
 * @returns
 */
export function groups (params) {
  return request({
    url: '/home/groups',
    params
  })
}
