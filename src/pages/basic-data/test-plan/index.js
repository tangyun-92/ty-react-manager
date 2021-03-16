/*
 * @Author: 唐云
 * @Date: 2021-03-05 14:39:06
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-16 11:15:23
 * 考试计划
 */
import React, { memo } from 'react'

import confirm from 'antd/lib/modal/confirm'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Tag, Space, message } from 'antd'

import MyTable from '@/components/MyTable'
import { getTestPlanList, delTestPlan } from '@/api/basic-data/test-plan'

export default memo(function TestPlan() {
  /**
   * state and props
   */

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
          <a href="#/">参数配置</a>
          <a href="#/">编辑</a>
          <a href="#/" onClick={(e) => handleDelete(record.id)}>
            删除
          </a>
        </Space>
      ),
    },
  ]

  /**
   * redux hooks
   */

  /**
   * other hooks
   */

  /**
   * other handles
   */

  // 删除考试计划
  const handleDelete = (id) => {
    confirm({
      title: '是否确定删除',
      icon: <ExclamationCircleOutlined />,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        delTestPlan(id)
          .then((res) => {
            message.success(res.message)
          })
          .catch((err) => {
            message.error(err)
          })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div>
      <div className="basic-content">
        <div className="basic-content-button">
          <Button type="primary">添加</Button>
        </div>
        <MyTable api={getTestPlanList} columns={columns} />
      </div>
    </div>
  )
})
