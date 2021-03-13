/*
 * @Author: 唐云
 * @Date: 2021-03-13 14:20:27
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-13 15:38:19
 * 公共接口
 */
import request from '@/services/request'

/**
 * 切换考试计划
 * @param {*} data
 */
export function exchangeExam(data) {
  return request({
    url: '/public/exchangeExam',
    method: 'post',
    data,
  })
}

/**
 * 获取用户菜单列表
 */
export function getUserMenuList() {
  return request({
    url: '/public/getUserMenus',
    method: 'get',
  })
}

/**
 * 获取用户功能权限列表
 */
export function getUserFunctionList() {
  return request({
    url: '/public/getUserGns',
    method: 'get',
  })
}
