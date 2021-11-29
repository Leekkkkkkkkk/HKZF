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
