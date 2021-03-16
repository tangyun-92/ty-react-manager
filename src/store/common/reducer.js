import { Map } from 'immutable'

import * as actionType from './constants'

const defaultState = Map({
  importModalStatus: false, // 导入modal状态
  total: 0, // 总计
  currentPage: 1, // 当前选中页
  pageSize: 10, // 每页显示条数
  tableLoading: false, // table加载
  tableData: [], // 表格数据
  searchData: {}, // 搜索数据
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionType.CHANGE_IMPORT_MODAL_STATUS:
      return state.set('importModalStatus', action.importModalStatus)
    case actionType.CHANGE_TOTAL:
      return state.set('total', action.total)
    case actionType.CHANGE_CURRENT_PAGE:
      return state.set('currentPage', action.currentPage)
    case actionType.CHANGE_PAGE_SIZE:
      return state.set('pageSize', action.pageSize)
    case actionType.CHANGE_TABLE_LOADING:
      return state.set('tableLoading', action.tableLoading)
    case actionType.CHANGE_TABLE_DATA:
      return state.set('tableData', action.tableData)
    case actionType.CHANGE_SEARCH_DATA:
      return state.set('searchData', action.searchData)
    default:
      return state
  }
}

export default reducer
