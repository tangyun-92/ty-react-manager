/*
 * @Author: 唐云 
 * @Date: 2021-03-15 21:25:09 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-16 10:20:57
 * 考生报名信息
 */
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
