import request from '@/utils/request'
// 发起请求获取轮播图
export const swiper = params => request({
  url: '/home/swiper',
  method: 'GET',
  params
})
export const groups = params => request({
  url: '/home/groups',
  method: 'GET',
  params
})
