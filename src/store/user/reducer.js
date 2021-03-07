import { Map } from 'immutable'

import * as actionTypes from './constants'

const defaultState = Map({
  username: '', // 登录状态
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_USERNAME:
      return state.set('username', action.username)  
    default:
      return state
  }
}

export default reducer