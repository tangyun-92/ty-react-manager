import request from '@/services/request'

/**
 * 登录
 * @param {*} data 
 * @returns 
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}