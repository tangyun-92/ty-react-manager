import { message } from 'antd'

import * as actionTypes from './constants'
import { login } from '@/api/login'
import { exchangeExam, getUserMenuList, getUserFunctionList } from '@/api/public'

// 清空保存的用户信息
export const changeResetUserAction = (username) => ({
  type: actionTypes.CHANGE_RESET_USER,
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

// 考试计划编码
export const changeKsjhbmAction = (ksjhbm) => ({
  type: actionTypes.CHANGE_KSJHBM,
  ksjhbm,
})

// 用户菜单列表
export const changeUserMenuListAction = (userMenuList) => ({
  type: actionTypes.CHANGE_USER_MENU_LIST,
  userMenuList,
})

// 用户功能权限列表
export const changeUserFunctionListAction = (userFunctionList) => ({
  type: actionTypes.CHANGE_USER_FUNCTION_LIST,
  userFunctionList,
})

// 登录状态
export const changeLoginStatusAction = (loginStatus) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  loginStatus,
})

// 登录
export const getLoginAction = (data) => {
  return (dispatch) => {
    login(data).then((res) => {
      message.success('登录成功')
      // 保存用户名
      dispatch(changeUsernameAction(res.data.yhzh))
      // 保存考试管理机构id
      dispatch(changeKsgljgidAction(res.data.ksgljgid))
      // 保存考试计划列表
      dispatch(changeExamListAction(res.data.examList))
      // 修改登录状态
      dispatch(changeLoginStatusAction(true))
      if (res.data.examList.length === 0) {
        dispatch(changeCurrentExamPlanAction(res.data.examList[0].ksjhmc))
        dispatch(changeKsjhbmAction(res.data.examList[0].ksjhbm))
      }
      // 用户菜单列表
      getUserMenuList().then((res) => {
        dispatch(changeUserMenuListAction(res.data))
      })
      // 用户功能权限列表
      getUserFunctionList().then((res) => {
        dispatch(changeUserFunctionListAction(res.data))
      })
    })
  }
}

// 切换考试计划
export const getCurrentExamPlanAction = (data) => {
  return (dispatch) => {
    exchangeExam({ ksjhbm: data.value }).then((res) => {
      // 保存考试计划名称
      dispatch(changeCurrentExamPlanAction(data.label))
      // 保存考试计划编码
      dispatch(changeKsjhbmAction(data.value))
      message.success(res.message)
    })
  }
}
