/*
 * @Author: 唐云 
 * @Date: 2021-04-08 10:40:23 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-04-08 10:41:31
 * 监考人员编排
 */
import request from '@/services/request'

/**
 * 获取监考员编排列表
 * @param {*} data
 */
export function getSupervisorList(data) {
  return request({
    url: '/jkrybp/bplist',
    method: 'post',
    data,
  })
}

