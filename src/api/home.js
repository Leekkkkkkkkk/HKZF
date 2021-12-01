import request from '@/utils/request'
import { jsonp } from 'vue-jsonp'

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
/**
 *获取本地地址
 * @param {*} params
 * @returns {}
 */
export function Bmap () {
  return jsonp('http://api.map.baidu.com/location/ip?ak=9HeOiLigGH1fiB5l5GKI5WDy8vN2MBF3&coor=bd09ll', {

  }, 3000)
}
