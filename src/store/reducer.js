// import { combineReducers } from 'redux-immutable'
import { combineReducers } from 'redux'

import { reducer as userReducer } from './user'

const cReducer = combineReducers({
  user: userReducer,
})

export default cReducer
