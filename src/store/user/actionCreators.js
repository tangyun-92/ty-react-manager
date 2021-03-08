import * as actionTypes from './constants'

import { login } from '@/api/login'

// 用户名
const changeUsernameAction = (username) => ({
  type: actionTypes.CHANGE_USERNAME,
  username,
})

// token
const changeTokenAction = token => ({
  type: actionTypes.CHANGE_TOKEN,
  token
})

// 改变用户名
export const getLoginAction = (data) => {
  return (dispatch) => {
    login(data).then((res) => {
      dispatch(changeUsernameAction(res.data.yhzh))
      dispatch(changeTokenAction('token'))
    })
  }
}
