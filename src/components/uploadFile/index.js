/*
 * @Author: 唐云
 * @Date: 2021-03-14 22:21:52
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-18 11:09:58
 * 上传组件
 */
import React, { memo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Button, message, Modal, Upload } from 'antd'

import { BASE_URL } from '@/services/config'
import {
  changeImportModalStatusAction,
  getTableListAction,
} from '@/store/common/actionCreators'
import axios from 'axios'

export default memo(function UploadFile(props) {
  /**
   * state and props
   */
  let { title, api, apiData } = props
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)

  /**
   * redux hooks
   */
  const { importModalStatus, token } = useSelector(
    (state) => ({
      importModalStatus: state.common.get('importModalStatus'), // 离线导入modal状态
      token: state.user.get('token'),
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  /**
   * other handles
   */
  // 取消导入modal
  const cancelImport = () => {
    dispatch(changeImportModalStatusAction(false))
    setFileList([])
  }

  // 导入逻辑
  const handleUpload = () => {
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('file', file)
    })

    setUploading(true)

    axios({
      url: BASE_URL + apiData,
      method: 'post',
      processData: false,
      headers: {
        'Sfrz-Manage-Token': token,
      },
      data: formData,
    })
      .then((res) => {
        setFileList([])
        setUploading(false)
        dispatch(changeImportModalStatusAction(false))
        dispatch(getTableListAction(api))
        message.success(res.data.message)
      })
      .catch((err) => {
        setUploading(false)
        console.error(err)
      })
  }

  // 移除文件时的回调
  const onRemove = (file) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    setFileList(newFileList)
  }

  // 上传前的钩子
  const beforeUpload = (file) => {
    setFileList([...fileList, file])
    return false
  }

  return (
    <div>
      <Modal
        title={title}
        visible={importModalStatus}
        onCancel={(e) => dispatch(changeImportModalStatusAction(false))}
        okText="上传"
        footer={[
          <Button onClick={() => cancelImport()} key="btn">
            取消
          </Button>,
        ]}
      >
        <Upload
          onRemove={onRemove}
          beforeUpload={beforeUpload}
          fileList={fileList}
        >
          <Button type="primary">选择文件</Button>
        </Upload>
        <Button
          type="primary"
          onClick={() => handleUpload()}
          disabled={fileList.length === 0}
          style={{ marginTop: 16 }}
          loading={uploading}
        >
          上传
        </Button>
      </Modal>
    </div>
  )
})
