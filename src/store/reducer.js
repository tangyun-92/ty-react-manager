// import { combineReducers } from 'redux-immutable'
import { combineReducers } from 'redux'

import { reducer as userReducer } from './user'
import { reducer as baseDataReducer } from './base-data'
import { reducer as commonReducer } from './common'

const cReducer = combineReducers({
  user: userReducer,
  baseData: baseDataReducer,
  common: commonReducer,
})

export default cReducer
