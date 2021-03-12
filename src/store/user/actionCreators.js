import * as actionTypes from './constants'

import { login } from '@/api/login'

// 清空保存的用户信息
export const changeResetUserAction = (username) => ({
  type: actionTypes.CHANGE_RESET_USER
})

// 用户名
export const changeUsernameAction = (username) => ({
  type: actionTypes.CHANGE_USERNAME,
  username,
})

// token
export const changeTokenAction = (token) => ({
  type: actionTypes.CHANGE_TOKEN,
  token,
})

// 考试管理机构id
export const changeKsgljgidAction = (ksgljgid) => ({
  type: actionTypes.CHANGE_KSGLJGID,
  ksgljgid,
})

// 考试管理机构id
export const changeExamListAction = (examList) => ({
  type: actionTypes.CHANGE_EXAM_LIST,
  examList,
})

// 选中的考试计划
export const changeCurrentExamPlanAction = (currentExamPlan) => ({
  type: actionTypes.CHANGE_CURRENT_EXAM_PLAN,
  currentExamPlan,
})

// 登录状态
export const changeLoginStatusAction = (loginStatus) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  loginStatus,
})

// 改变用户名
export const getLoginAction = (data) => {
  return (dispatch) => {
    login(data).then((res) => {
      dispatch(changeUsernameAction(res.data.yhzh))
      dispatch(changeKsgljgidAction(res.data.ksgljgid))
      dispatch(changeExamListAction(res.data.examList))
      dispatch(changeTokenAction('token'))
      dispatch(changeLoginStatusAction(true))
      if (res.data.examList.length === 0) {
        dispatch(changeCurrentExamPlanAction(res.data.examList[0].ksjhmc))
      }
    })
  }
}
