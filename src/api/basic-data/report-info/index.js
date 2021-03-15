import request from '@/services/request'

/**
 * 获取考生报名信息列表
 * @param {*} data
 */
export function getReportInfoList(data) {
  return request({
    url: '/bmxx/query',
    method: 'post',
    data,
  })
}

/**
 * 清空
 * @param {*} data
 */
export function clearAll(data) {
  return request({
    url: '/bmxx/del',
    method: 'post',
    data,
  })
}
