import {Map} from 'immutable'

import * as actionTypes from './constants'

const defaultState = Map({
  userOrgTreeList: [], // 用户机构树列表（与考试无关）
  userExamOrgTreeList: [], // 用户考试机构树列表
  examRoomList: [], // 考点下的考场列表
  roundList: [], // 场次列表
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_USER_ORG_TREE:
      return state.set('userOrgTreeList', action.userOrgTreeList)
    case actionTypes.CHANGE_USER_EXAM_ORG_TREE:
      return state.set('userExamOrgTreeList', action.userExamOrgTreeList)
    case actionTypes.CHANGE_EXAM_ROOM_LIST:
      return state.set('examRoomList', action.examRoomList)
    case actionTypes.CHANGE_ROUND_LIST:
      return state.set('roundList', action.roundList)
    default:
      return state
  }
}

export default reducer