import request from '@/services/request'

/**
 * 登录
 * @param {*} data
 */
export function getReportInfoList(data) {
  return request({
    url: '/bmxx/query',
    method: 'post',
    data,
  })
}
