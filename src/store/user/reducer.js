import { Map } from 'immutable'

import * as actionTypes from './constants'

const defaultState = Map({
  username: '', // 用户名,
  token: 'token', // token
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_USERNAME:
      return state.set('username', action.username)  
    case actionTypes.CHANGE_TOKEN:
      return state.set('token', action.token)  
    default:
      return state
  }
}

export default reducer