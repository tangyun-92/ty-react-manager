import React, { memo, useEffect } from 'react'

import { Pagination, Table } from 'antd'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  changeCurrentPageAction,
  changePageSizeAction,
  changeTableLoadingAction,
  getTableListAction,
} from '@/store/common/actionCreators'

export default memo(function MyPagination(props) {
  /**
   * state and props
   */
  const { api, columns } = props

  /**
   * redux hooks
   */
  const dispatch = useDispatch()
  const { total, currentPage, pageSize, tableLoading, tableData } = useSelector(
    (state) => ({
      total: state.common.get('total'),
      currentPage: state.common.get('currentPage'),
      pageSize: state.common.get('pageSize'),
      searchData: state.common.get('searchData'),
      tableLoading: state.common.get('tableLoading'),
      tableData: state.common.get('tableData'),
    }),
    shallowEqual
  )

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(changeTableLoadingAction(true))
    // 获取列表
    dispatch(getTableListAction(api))
  }, [dispatch, api])

  /**
   * other handles
   */
  // 页码切换
  const changePagination = (page, pageSize) => {
    dispatch(changePageSizeAction(pageSize))
    dispatch(changeCurrentPageAction(page))
    dispatch(getTableListAction(api))
  }

  return (
    <div>
      <div className="content-table">
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey={(record) => record.id || record.sfzjhm}
          pagination={false}
          loading={tableLoading}
        />
      </div>
      <div className="content-pagination">
        <Pagination
          total={total}
          showTotal={(total) => `共 ${total} 条`}
          current={currentPage}
          pageSize={pageSize}
          onChange={changePagination}
          showSizeChanger
        />
      </div>
    </div>
  )
})
