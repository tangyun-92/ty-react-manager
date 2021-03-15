/*
 * @Author: 唐云
 * @Date: 2021-03-05 14:39:16
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-15 14:29:28
 * 考生报名信息
 */
import React, { memo, useEffect, useState } from 'react'

import { Form, Input, Button, Table, Tag, Pagination } from 'antd'

import { getReportInfoList } from '@/api/basic-data/report-info'
import UploadFile from '@/components/uploadFile'
import { useDispatch } from 'react-redux'
import { changeImportModalStatusAction } from '@/store/common/actionCreators'

export default memo(function ReportInfo() {
  /**
   * state and props
   */
  const [searchForm] = Form.useForm() // 搜索form
  const [tableData, setTableData] = useState([]) // 表格数据
  const [searchData, setSearchData] = useState({}) // 搜索数据
  const [total, setTotal] = useState(0) // 总计
  const [currentPage, setCurrentPage] = useState(1) // 当前选中页面
  const [pageSize, setPageSize] = useState(10) // 每页显示条数
  const [loading, setLoading] = useState(false) // table加载

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
        <>
          {<Tag color={tags === '男' ? 'blue' : 'orange'}>{tags}</Tag>}
        </>
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

  /**
   * other hooks
   */
  useEffect(() => {
    searchForm.setFieldsValue(['xm', 'sfzh', 'ksh'])
  }, [searchForm])
  useEffect(() => {
    setLoading(true)
    // 获取列表
    getReportInfoList({
      ...searchData,
      currentPage,
      pageSize,
    })
      .then((res) => {
        setTableData(res.data.records)
        setTotal(res.data.total)
        setCurrentPage(res.data.current)
      })
      .catch((err) => {
        setTableData([])
        setTotal(0)
        setCurrentPage(1)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [searchData, currentPage, pageSize])

  /**
   * other handles
   */
  // 搜索
  const handleClickSearch = async () => {
    setCurrentPage(1)
    const values = await searchForm.validateFields()
    setSearchData(values)
  }

  // 页码切换
  const changePagination = (page, pageSize) => {
    setPageSize(pageSize)
    setCurrentPage(page)
  }

  return (
    <div>
      <div className="basic-header">
        <Form layout="inline" form={searchForm} labelCol={{ offset: 1 }}>
          <Form.Item label="姓名" name="xm">
            <Input placeholder="请输入" onPressEnter={handleClickSearch} />
          </Form.Item>
          <Form.Item label="身份证号" name="sfzh">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="考生号" name="ksh">
            <Input placeholder="请输入" />
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
          <Button type="primary">清空</Button>
          <Button type="primary">模板下载</Button>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey={(record) => record.id}
          pagination={false}
          loading={loading}
        />
      </div>
      <div className="basic-footer">
        <Pagination
          total={total}
          showTotal={(total) => `共 ${total} 条`}
          current={currentPage}
          pageSize={pageSize}
          onChange={changePagination}
          showSizeChanger
        />
      </div>
      <UploadFile title="离线导入" />
    </div>
  )
})
