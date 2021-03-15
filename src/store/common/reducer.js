import {Map} from 'immutable'

import * as actionType from './constants'

const defaultState = Map({
  importModalStatus: false, // 导入modal状态
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionType.CHANGE_IMPORT_MODAL_STATUS:
      return state.set('importModalStatus', action.importModalStatus)
    default:
      return state
  }
}

export default reducer