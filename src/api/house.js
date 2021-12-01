import request from '@/utils/request'
/**
 *房屋详情信息
 * @param {*} id {houseCode}
 * @returns
 */
export function getHouses (id) {
  return request({
    url: `/houses/${id}`
  })
}
/**
 * 发布房源需要的东西
 * @param {*} params
 * @returns
 */
export function PublishHouse (params) {
  return request({
    url: '/houses/params',
    params
  })
}
