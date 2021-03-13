import * as actionTypes from './constants'

import {
  getExamRoomList,
  getRoundList,
  getUserExamOrgTreeList,
  getUserOrgTreeList,
} from '@/api/public'

// 用户机构树
export const changeUserOrgTreeListAction = (userOrgTreeList) => ({
  type: actionTypes.CHANGE_USER_ORG_TREE,
  userOrgTreeList,
})

// 用户考试机构树
export const changeUserExamOrgTreeListAction = (userExamOrgTreeList) => ({
  type: actionTypes.CHANGE_USER_EXAM_ORG_TREE,
  userExamOrgTreeList,
})

// 考点下的考场列表
export const changeExamRoomListAction = (examRoomList) => ({
  type: actionTypes.CHANGE_EXAM_ROOM_LIST,
  examRoomList,
})

// 场次列表
export const changeRoundListAction = (roundList) => ({
  type: actionTypes.CHANGE_ROUND_LIST,
  roundList,
})

// 获取用户机构树
export const getBaseDataAction = () => {
  return (dispatch, getState) => {
    getUserOrgTreeList().then((res) => {
      dispatch(changeUserOrgTreeListAction(res.data))
    })
    getUserExamOrgTreeList().then((res) => {
      dispatch(changeUserExamOrgTreeListAction(res.data))
    })

    const ksjhbm = getState().user.get('ksjhbm')
    const ksgljgid = getState().user.get('ksgljgid')
    getExamRoomList({ ksgljgid, ksjhbm }).then((res) => {
      dispatch(changeExamRoomListAction(res.data))
    })
    getRoundList({ ksjhbm }).then((res) => {
      dispatch(changeRoundListAction(res.data))
    })
  }
}
