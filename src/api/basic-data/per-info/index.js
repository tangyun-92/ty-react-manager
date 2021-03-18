/*
 * @Author: 唐云 
 * @Date: 2021-03-15 21:25:09 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-18 10:05:27
 * 工作人员信息
 */
import request from '@/services/request'

/**
 * 获取工作人员信息列表
 * @param {*} data
 */
export function getPerInfoList(data) {
  return request({
    url: '/gzry/gzrylist',
    method: 'post',
    data,
  })
}

/**
 * 获取岗位职责码表数据
 * @param {*} data
 */
export function getJobDutyCode(data) {
  return request({
    url: '/gzry/getGwzz',
    method: 'get',
    data,
  })
}

/**
 * 清空
 * @param {*} data
 */
export function clearAll(data) {
  return request({
    url: '/gzry/clearAll',
    method: 'get',
    data,
  })
}
