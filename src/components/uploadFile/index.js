/*
 * @Author: 唐云
 * @Date: 2021-03-14 22:21:52
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-15 09:23:29
 * 上传组件
 */
import React, { memo } from 'react'

import { Modal } from 'antd'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { changeImportModalStatusAction } from '@/store/common/actionCreators'

export default memo(function UploadFile(props) {
  /**
   * state and props
   */
  let { title } = props

  /**
   * redux hooks
   */
  const { importModalStatus } = useSelector(
    (state) => ({
      importModalStatus: state.common.get('importModalStatus'), // 离线导入modal状态
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  /**
   * other handles
   */
  const handleOk = () => {}

  return (
    <div>
      <Modal
        title={title}
        visible={importModalStatus}
        onOk={handleOk}
        onCancel={e => dispatch(changeImportModalStatusAction(false))}
        okText="上传"
      ></Modal>
    </div>
  )
})
