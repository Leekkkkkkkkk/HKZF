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
/**
 *获取房屋查询条件
 * @param {*} params {}
 * @returns
 */
export function getCondition (id) {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}
/**
 *查询房屋城市
 * @param {*} params {
 * cityid,
 * area,
 * subway,
 * rentType,
 * price,
 * more,
 * roomType,
 * oriented,
 * characteristic,
 * floor,
 * start,
 * end
 * }
 */
export function getAllHouses (params) {
  return request({
    url: '/houses',
    params
  })
}
