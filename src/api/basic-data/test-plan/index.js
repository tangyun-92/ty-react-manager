/*
 * @Author: 唐云 
 * @Date: 2021-03-15 21:25:26 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-16 16:40:42
 * 考试计划
 */
import request from '@/services/request'

/**
 * 获取考试计划
 */
export function getTestPlanList(data) {
  return request({
    url: '/ksjh/all',
    method: 'post',
    data,
  })
}

/**
 * 添加考试计划
 * @param {*} data
 */
export function addTestPlan(data) {
  return request({
    url: '/ksjh/add',
    method: 'post',
    data,
  })
}

/**
 * 修改考试计划
 * @param {*} data
 */
export function editTestPlan(data) {
  return request({
    url: '/ksjh/upd',
    method: 'post',
    data,
  })
}

/**
 * 删除考试计划
 * @param {*} data
 */
export function delTestPlan(data) {
  return request({
    url: '/ksjh/del',
    method: 'post',
    data,
  })
}

/**
 * 获取考试类型
 */
export function getTestTypeList() {
  return request({
    url: '/ksjh/kslx',
    method: 'post',
  })
}