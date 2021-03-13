// import { combineReducers } from 'redux-immutable'
import { combineReducers } from 'redux'

import { reducer as userReducer } from './user'
import { reducer as baseDataReducer } from './base-data'

const cReducer = combineReducers({
  user: userReducer,
  baseData: baseDataReducer
})

export default cReducer
