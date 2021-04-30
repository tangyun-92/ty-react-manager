/*
 * @Author: 唐云 
 * @Date: 2021-04-08 09:50:55 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-04-08 10:53:09
 * 监考人员编排
 */
import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Form, Input, Button, Tag, Select, Cascader, Tabs } from 'antd'

import MyTable from '@/components/MyTable'
import {
  getSupervisorList
} from '@/api/basic-data/per-arrangement'
import {
  changeCurrentPageAction,
  changeSearchDataAction,
  getTableListAction,
} from '@/store/common/actionCreators'
// import { objectToArray } from '@/utils'
import { getExamRoomList } from '@/api/public'

const { TabPane } = Tabs

export default memo(function PerInfo() {
  /**
   * state and props
   */
  const [searchForm] = Form.useForm() // 搜索form
  const [examRoomList, setExamRoomList] = useState([]) // 机构下的考场列表

  // table
  const columns = [
    {
      title: '姓名',
      dataIndex: 'xm',
    },
    {
      title: '身份证件号码',
      dataIndex: 'sfzjhm',
    },
    {
      title: '机构',
      dataIndex: 'ksgljgmc',
    },
    {
      title: '场次',
      dataIndex: 'ccmc',
    },
    {
      title: '考场',
      dataIndex: 'kcbh',
    },
    {
      title: '分配时间',
      dataIndex: 'gxsj',
    },
  ]

  /**
   * redux hooks
   */
  const dispatch = useDispatch()
  const { userExamOrgTreeList, ksjhbm, roundList } = useSelector(
    (state) => ({
      userExamOrgTreeList: state.baseData.get('userExamOrgTreeList'),
      ksjhbm: state.user.get('ksjhbm'),
      roundList: state.baseData.get('roundList'),
    }),
    shallowEqual
  )

  const options = userExamOrgTreeList

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
    if (values.ksjg) {
      values.ksjg = values.ksjg[values.ksjg.length - 1]
    }
    dispatch(changeSearchDataAction(values))
    dispatch(getTableListAction(getSupervisorList))
  }

  // 始终选中最后点击的级联数据
  const displayRender = (label) => {
    return label[label.length - 1]
  }

  // 级联选择器选择时
  const handleCascader = (val, node) => {
    if (node.length === 4) {
      // 获取机构下的考场信息
      getExamRoomList({
        ksjhbm,
        ksgljgid: node[3].ksgljgid,
      }).then(async (res) => {
        await setExamRoomList(res.data)
      })
    }
  }

  const callback = (key) => {
    console.log(key)
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="监考员编排" key="1">
          <div className="basic-header">
            <Form layout="inline" form={searchForm} labelCol={{ offset: 1 }}>
              <Form.Item label="机构" name="ksjg">
                <Cascader
                  fieldNames={{
                    label: 'ksgljgmc',
                    value: 'ksgljgid',
                    children: 'children',
                  }}
                  changeOnSelect
                  displayRender={displayRender}
                  options={options}
                  onChange={handleCascader}
                />
              </Form.Item>
              <Form.Item label="场次" name="gwzzm">
                <Select placeholder="请选择" onChange={handleClickSearch}>
                  {roundList.map((item) => {
                    return (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="姓名" name="xm">
                <Input placeholder="请输入" onPressEnter={handleClickSearch} />
              </Form.Item>
              <Form.Item label="身份证件号码" name="sfzjhm">
                <Input placeholder="请输入" onPressEnter={handleClickSearch} />
              </Form.Item>
              <Form.Item label="考场" name="gwzzm">
                <Select placeholder="请选择" onChange={handleClickSearch}>
                  {examRoomList.map((item) => {
                    return (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Form>
            <Button type="primary" onClick={handleClickSearch}>
              查询
            </Button>
          </div>
          <div className="basic-content">
            <MyTable api={getSupervisorList} columns={columns} />
          </div>
        </TabPane>
        <TabPane tab="监考员分配" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  )
})
