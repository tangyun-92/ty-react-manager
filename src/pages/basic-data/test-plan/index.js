/*
 * @Author: 唐云
 * @Date: 2021-03-05 14:39:06
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-17 16:22:17
 * 考试计划
 */
import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Tag, Space, Modal, Input, Form } from 'antd'

import MyTable from '@/components/MyTable'
import ParamForm from './components/ParamForm'
import MyForm from './components/Form'
import {
  getTestPlanList,
  delTestPlan,
  getTestTypeList,
  getTestPlanParam,
} from '@/api/basic-data/test-plan'
import {
  changeEditModalStatusAction,
  changeModalTitleAction,
  changeOtherModalStatusAction,
  getClearAllAction,
} from '@/store/common/actionCreators'
import moment from 'moment'

export default memo(function TestPlan() {
  /**
   * state and props
   */
  const [testType, setTestType] = useState({}) // 考试类型
  const [tableRowData, setTableRowData] = useState({}) // 表格行数据
  const [paramInfo, setParamInfo] = useState([]) // 参数信息
  const [delModalStatus, setDelModalStatus] = useState(false) // 清空modal状态
  const [delId, setDelId] = useState('') // 删除的考试计划编码
  const [form] = Form.useForm()

  // table
  const columns = [
    {
      title: '考试年度',
      dataIndex: 'ksnd',
    },
    {
      title: '考试计划编码',
      dataIndex: 'ksjhbm',
    },
    {
      title: '考试计划名称',
      dataIndex: 'ksjhmc',
    },
    {
      title: '考试类型',
      dataIndex: 'kslx',
      render: (data) => <>{testType[data]}</>,
    },
    {
      title: '开始时间',
      dataIndex: 'kssj',
    },
    {
      title: '结束时间',
      dataIndex: 'jssj',
    },
    {
      title: '考试状态',
      dataIndex: 'kszt',
      render: (tags) => (
        <>
          {
            <Tag color={tags === '0' ? 'success' : 'error'}>
              {tags === '0' ? '启用' : '未启用'}
            </Tag>
          }
        </>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'cjsj',
    },
    {
      title: '操作',
      dataIndex: '',
      render: (text, record) => (
        <Space size="middle">
          <a
            href="#/"
            onClick={(e) => paramModal('考试计划参数信息配置', record)}
          >
            参数配置
          </a>
          <a href="#/" onClick={(e) => operaModal('编辑', record)}>
            编辑
          </a>
          <a href="#/" onClick={(e) => handleDelete(record.ksjhbm)}>
            删除
          </a>
        </Space>
      ),
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
    getTestTypeList().then((res) => {
      setTestType(res.data)
    })
  }, [])

  /**
   * other handles
   */
  // 删除考试计划
  const handleDelete = (id) => {
    setDelId(id)
    setDelModalStatus(true)
    form.resetFields()
  }

  // 点击添加/编辑按钮
  const operaModal = (type, item) => {
    if (item) {
      const data = JSON.parse(JSON.stringify(item))
      data.kssj = moment(data.kssj)
      data.jssj = moment(data.jssj)
      data.ksnd = moment(data.ksnd)
      setTableRowData(data)
    }

    dispatch(changeEditModalStatusAction(true))
    dispatch(changeModalTitleAction(`${type}考试计划`))
  }

  // 点击参数配置
  const paramModal = (type, item) => {
    getTestPlanParam({ ksjhbm: item.ksjhbm }).then((res) => {
      setParamInfo(res.data)
    })
    dispatch(changeOtherModalStatusAction(true))
    dispatch(changeModalTitleAction(type))
  }

  // 删除modal关闭
  const onCancel = () => {
    setDelModalStatus(false)
  }

  // 删除考试计划
  const onOk = () => {
    form.validateFields().then(() => {
      const data = {
        ksjhbm: delId,
        delpwd: form.getFieldsValue().delpwd,
      }
      dispatch(getClearAllAction(delTestPlan, getTestPlanList, '删除', data))
      setDelModalStatus(false)
    })
  }

  return (
    <div>
      <div className="basic-content">
        <div className="basic-content-button">
          <Button type="primary" onClick={(e) => operaModal('添加')}>
            添加
          </Button>
        </div>
        <MyTable api={getTestPlanList} columns={columns} />
      </div>
      <Modal
        title="清空密码确认"
        visible={delModalStatus}
        onCancel={(e) => onCancel()}
        onOk={() => onOk()}
        okText="保存"
        width={400}
        forceRender
      >
        <Form layout="horizontal" form={form}>
          <Form.Item
            label="确认密码"
            name="delpwd"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
      <MyForm type={testType} row={tableRowData} />
      <ParamForm paramInfo={paramInfo} />
    </div>
  )
})
