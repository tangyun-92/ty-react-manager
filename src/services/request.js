import axios from 'axios'
import store from '@/store'
import { Redirect } from 'react-router'

import { message } from 'antd'

import { BASE_URL, TIMEOUT } from './config'
import {
  changeResetUserAction,
  changeTokenAction,
} from '@/store/user/actionCreators'

const service = axios.create({
  baseURL: BASE_URL,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
  timeout: TIMEOUT,
})

/**
 * 请求拦截器
 * 统一处理请求拦截，如：添加token等
 */
service.interceptors.request.use(
  (config) => {
    const token = store.getState().user.get('token')
    console.log(token)
    if (token) {
      config.headers['Sfrz-Manage-Token'] = token
    }
    if (config.method === 'get') {
      config.params = config.data
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 * 统一处理响应拦截
 * 如：重定向、消息提示等操作
 */
service.interceptors.response.use(
  (response) => {
    const token = store.getState().user.get('token')
    const resToken = response.headers['sfrz-manage-token']
    if (!token) {
      store.dispatch(changeTokenAction(resToken))
    }
    const res = response.data
    if (!res.result && res.code === 2008) {
      store.dispatch(changeResetUserAction(''))
      return <Redirect to="/login" />
    } else if (!res.result && res.code !== 2008) {
      message.error(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log(error.response)
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        const encodeUrl = encodeURIComponent(`${window.location.href}`)
        window.location.href = BASE_URL + `/ssoLogin?redirectUrl=${encodeUrl}`
        return
      }
    }
    message.error(error.message || 'Error')
    return Promise.reject(error)
  }
)

const request = (requestObj) => {
  const { url, method, data, timeout } = requestObj
  return service({
    url,
    method: method || 'post',
    data: {
      data,
    },
    timeout: timeout || 15000,
  })
}

export default request
