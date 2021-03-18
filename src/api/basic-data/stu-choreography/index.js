/*
 * @Author: 唐云 
 * @Date: 2021-03-15 21:25:09 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-18 14:13:35
 * 考生编排
 */
import request from '@/services/request'

/**
 * 获取考生编排列表
 * @param {*} data
 */
export function getStuChoreographyList(data) {
  return request({
    url: '/bpxx/query',
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
    url: '/bpxx/del',
    method: 'post',
    data,
  })
}
