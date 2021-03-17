import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { Modal, Form, Input, Select, message, DatePicker } from 'antd'

import {
  changeEditModalStatusAction,
  getTableListAction,
} from '@/store/common/actionCreators'
import { objectToArray } from '@/utils/index'
import {
  addTestPlan,
  editTestPlan,
  getTestPlanList,
} from '@/api/basic-data/test-plan'

export default memo(function EditForm(props) {
  /**
   * state and props
   */
  let { type, row } = props
  const [form] = Form.useForm()
  const [testTypeArray, setTestTypeArray] = useState([])

  /**
   * redux hooks
   */
  const dispatch = useDispatch()
  const { editModalStatus, modalTitle } = useSelector(
    (state) => ({
      editModalStatus: state.common.get('editModalStatus'),
      modalTitle: state.common.get('modalTitle'),
    }),
    shallowEqual
  )

  /**
   * other hooks
   */
  useEffect(() => {
    setTestTypeArray(objectToArray(type))
    form.setFieldsValue(row)
  }, [type, row, form])

  /**
   * other handles
   */
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  }

  // 确定编辑
  const onOk = () => {
    form.validateFields().then(() => {
      const data = form.getFieldsValue()
      data.ksnd = moment(data.ksnd).format('YYYY')
      data.kssj = moment(data.kssj).format('YYYY-MM-DD HH:mm:ss')
      data.jssj = moment(data.jssj).format('YYYY-MM-DD HH:mm:ss')
      if (data.kssj >= data.jssj) {
        return message.error('开始时间必须小于结束时间')
      }
      if (modalTitle === '添加考试计划') {
        addTestPlan(data).then((res) => {
          message.success(res.message)
          dispatch(changeEditModalStatusAction(false))
          dispatch(getTableListAction(getTestPlanList))
        })
      } else {
        editTestPlan({ ...data, id: row.id }).then((res) => {
          message.success(res.message)
          dispatch(changeEditModalStatusAction(false))
          dispatch(getTableListAction(getTestPlanList))
        })
      }
    })
  }

  // 取消
  const onCancel = () => {
    form.resetFields()
    dispatch(changeEditModalStatusAction(false))
  }

  return (
    <div>
      <Modal
        title={modalTitle}
        visible={editModalStatus}
        onCancel={(e) => onCancel()}
        onOk={() => onOk()}
        okText="确定"
        width={600}
        forceRender
      >
        <Form {...formItemLayout} layout="horizontal" form={form}>
          <Form.Item
            label="考试计划编码"
            name="ksjhbm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="考试计划名称"
            name="ksjhmc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="请选择" />
          </Form.Item>
          <Form.Item
            label="考试年度"
            name="ksnd"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker picker="year" />
          </Form.Item>
          <Form.Item
            label="考试类型"
            name="kslx"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="请选择">
              {testTypeArray.map((item) => {
                return (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="开始时间"
            name="kssj"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name="jssj"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="考试状态"
            name="kszt"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="请选择">
              <Select.Option value="0">启用</Select.Option>
              <Select.Option value="1">未启用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})
