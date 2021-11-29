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
