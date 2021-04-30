/*
 * @Author: 唐云
 * @Date: 2021-03-05 14:39:16
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-04-08 10:35:21
 * 考生报名信息
 */
import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Form, Input, Button, Tag } from 'antd'

import UploadFile from '@/components/uploadFile'
import MyTable from '@/components/MyTable'
import { getReportInfoList, clearAll } from '@/api/basic-data/report-info'
import {
  changeCurrentPageAction,
  changeImportModalStatusAction,
  changeSearchDataAction,
  getClearAllAction,
  getTableListAction,
} from '@/store/common/actionCreators'
import { exportExcelMethod } from '@/utils'
import { BASE_URL } from '@/services/config'

export default memo(function ReportInfo() {
  /**
   * state and props
   */
  const [searchForm] = Form.useForm() // 搜索form

  // table
  const columns = [
    {
      title: '考试项目编号',
      dataIndex: 'ksjhbm',
    },
    {
      title: '考生号',
      dataIndex: 'ksh',
    },
    {
      title: '姓名',
      dataIndex: 'xm',
    },
    {
      title: '性别',
      dataIndex: 'xb',
      render: (tags) => (
        <>{<Tag color={tags === '男' ? 'blue' : 'orange'}>{tags}</Tag>}</>
      ),
    },
    {
      title: '身份证类型',
      dataIndex: 'sfzjlx',
    },
    {
      title: '身份证件号码',
      dataIndex: 'sfzjhm',
    },
    {
      title: '出生日期',
      dataIndex: 'csrq',
    },
    {
      title: '民族',
      dataIndex: 'mz',
    },
    {
      title: '户口所在地码',
      dataIndex: 'hkszdm',
    },
    {
      title: '户口所在地',
      dataIndex: 'hkszd',
    },
    {
      title: '外语语种',
      dataIndex: 'wyyz',
    },
  ]

  /**
   * redux hooks
   */
  const dispatch = useDispatch()
  const { token } = useSelector(
    (state) => ({
      token: state.user.get('token'),
    }),
    shallowEqual
  )

  /**
   * other hooks
   */
  useEffect(() => {
    dispatch(changeSearchDataAction(null))
    searchForm.setFieldsValue(['xm', 'sfzh', 'ksh'])
  }, [searchForm, dispatch])

  /**
   * other handles
   */
  // 搜索
  const handleClickSearch = async () => {
    dispatch(changeCurrentPageAction(1))
    const values = await searchForm.validateFields()
    dispatch(changeSearchDataAction(values))
    dispatch(getTableListAction(getReportInfoList))
  }

  // 清空
  const handleClearAll = () => {
    dispatch(getClearAllAction(clearAll, getReportInfoList, '清空'))
  }

  // 模板下载
  const templateDownload = () => {
    const url = `${BASE_URL}/bmxx/download`
    const data = {
      method: 'get',
      url: url,
      token: token,
      fileName: '考生报名信息模板.xlsx',
    }
    exportExcelMethod(data)
  }

  return (
    <div>
      <div className="basic-header">
        <Form layout="inline" form={searchForm} labelCol={{ offset: 1 }}>
          <Form.Item label="姓名" name="xm">
            <Input placeholder="请输入" onPressEnter={handleClickSearch} />
          </Form.Item>
          <Form.Item label="身份证号" name="sfzh">
            <Input placeholder="请输入" onPressEnter={handleClickSearch} />
          </Form.Item>
          <Form.Item label="考生号" name="ksh">
            <Input placeholder="请输入" onPressEnter={handleClickSearch} />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={handleClickSearch}>
          查询
        </Button>
      </div>
      <div className="basic-content">
        <div className="basic-content-button">
          <Button
            type="primary"
            onClick={(e) => dispatch(changeImportModalStatusAction(true))}
          >
            离线导入
          </Button>
          <Button type="primary" onClick={handleClearAll}>
            清空
          </Button>
          <Button type="primary" onClick={templateDownload}>
            模板下载
          </Button>
        </div>
        <MyTable api={getReportInfoList} columns={columns} />
      </div>
      <UploadFile
        title="离线导入"
        api={getReportInfoList}
        apiData="/bmxx/import"
      />
    </div>
  )
})
