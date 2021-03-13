import { Map } from 'immutable'

import * as actionTypes from './constants'

const defaultState = Map({
  username: '', // 用户名,
  token: '', // token
  ksgljgid: '', // 考试管理机构id
  examList: [], // 考试计划列表
  currentExamPlan: '', // 选中的考试计划
  ksjhbm: '', // 考试计划编码
  loginStatus: false, // 登录状态
  userMenuList: [], // 用户菜单列表
  userFunctionList: [], // 用户功能权限列表
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_RESET_USER:
      return defaultState
    case actionTypes.CHANGE_USERNAME:
      return state.set('username', action.username)
    case actionTypes.CHANGE_TOKEN:
      return state.set('token', action.token)
    case actionTypes.CHANGE_KSGLJGID:
      return state.set('ksgljgid', action.ksgljgid)
    case actionTypes.CHANGE_EXAM_LIST:
      return state.set('examList', action.examList)
    case actionTypes.CHANGE_CURRENT_EXAM_PLAN:
      return state.set('currentExamPlan', action.currentExamPlan)
    case actionTypes.CHANGE_KSJHBM:
      return state.set('ksjhbm', action.ksjhbm)
    case actionTypes.CHANGE_LOGIN_STATUS:
      return state.set('loginStatus', action.loginStatus)
    case actionTypes.CHANGE_USER_MENU_LIST:
      return state.set('userMenuList', action.userMenuList)
    case actionTypes.CHANGE_USER_FUNCTION_LIST:
      return state.set('userFunctionList', action.userFunctionList)
    default:
      return state
  }
}

export default reducer
