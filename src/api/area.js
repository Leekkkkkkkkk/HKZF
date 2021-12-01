import request from '@/utils/request'
/**
 *城市列表数据
 * @param {*} num {城市数据}
 * @returns promise
 */
export function cityList (num) {
  return request({
    url: '/area/city?level=' + num
  })
}
/// area/hot
export function hotList () {
  return request({
    url: 'area/hot'
  })
}
/**
 *上传图片
 * @param {*} data
 * @returns
 */
export function housesImg (data) {
  return request({
    url: '/houses/image',
    method: 'POST',
    headers: {
      'Content-type': 'multipart/form-data'
    },
    data
  })
}
/**
 *根据名字查询城市
 * @param {*} params
 * @returns
 */
export function Info (params) {
  return request({
    url: '/area/info',
    params
  })
}
/**
 *根据关键词查询小区
 * @param {*} name 城市名
 * @param {*} id 城市的ID
 * @returns
 */
export function community (name, id) {
  return request({
    url: '/area/community',
    params: {
      name,
      id
    }
  })
}
