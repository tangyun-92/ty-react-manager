import confirm from 'antd/lib/modal/confirm'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { message } from 'antd'

import * as actionTypes from './constants'

// 导入modal显示隐藏
export const changeImportModalStatusAction = (importModalStatus) => ({
  type: actionTypes.CHANGE_IMPORT_MODAL_STATUS,
  importModalStatus,
})

// 总计
export const changeTotalAction = (total) => ({
  type: actionTypes.CHANGE_TOTAL,
  total,
})

// 当前页
export const changeCurrentPageAction = (currentPage) => ({
  type: actionTypes.CHANGE_CURRENT_PAGE,
  currentPage,
})

// 每页显示条数
export const changePageSizeAction = (pageSize) => ({
  type: actionTypes.CHANGE_PAGE_SIZE,
  pageSize,
})

// table加载
export const changeTableLoadingAction = (tableLoading) => ({
  type: actionTypes.CHANGE_TABLE_LOADING,
  tableLoading,
})

// 表格数据
export const changeTableDataAction = (tableData) => ({
  type: actionTypes.CHANGE_TABLE_DATA,
  tableData,
})

// 搜索数据
export const changeSearchDataAction = (searchData) => ({
  type: actionTypes.CHANGE_SEARCH_DATA,
  searchData,
})

// 获取列表
export const getTableListAction = (getTableList) => {
  return (dispatch, getState) => {
    const searchData = getState().common.get('searchData')
    const currentPage = getState().common.get('currentPage')
    const pageSize = getState().common.get('pageSize')
    getTableList({
      ...searchData,
      currentPage,
      pageSize,
    })
      .then((res) => {
        dispatch(changeTableDataAction(res.data.records))
        dispatch(changeTotalAction(res.data.total))
        dispatch(changeCurrentPageAction(res.data.current))
      })
      .catch((err) => {
        dispatch(changeTableDataAction([]))
        dispatch(changeTotalAction(0))
        dispatch(changeCurrentPageAction(1))
      })
      .finally(() => {
        dispatch(changeTableLoadingAction(false))
      })
  }
}

// 清空
export const getClearAllAction = (clearAll, getTableList) => {
  return (dispatch) => {
    confirm({
      title: '是否确定清空',
      icon: <ExclamationCircleOutlined />,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        clearAll()
          .then((res) => {
            message.success(res.message)
            dispatch(getTableListAction(getTableList))
          })
          .catch((err) => {
            message.error(err)
          })
      },
      onCancel() {
        console.log('cancel')
      },
    })
  }
}
