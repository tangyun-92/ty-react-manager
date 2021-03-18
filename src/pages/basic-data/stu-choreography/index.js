/*
 * @Author: 唐云
 * @Date: 2021-03-18 14:09:50
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-18 14:47:40
 * 考生编排
 */
import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Form, Input, Button, Select, Cascader } from 'antd'

import UploadFile from '@/components/uploadFile'
import MyTable from '@/components/MyTable'
import {
  getStuChoreographyList,
  clearAll,
} from '@/api/basic-data/stu-choreography'
import {
  changeCurrentPageAction,
  changeImportModalStatusAction,
  changeSearchDataAction,
  getClearAllAction,
  getTableListAction,
} from '@/store/common/actionCreators'
import { exportExcelMethod, objectToArray } from '@/utils'
import { BASE_URL } from '@/services/config'
import { getExamRoomList } from '@/api/public'

export default memo(function StuChoreography() {
  /**
   * state and props
   */
  const [searchForm] = Form.useForm() // 搜索form
  const [examRoomList, setExamRoomList] = useState([]) // 机构下的考场列表

  // table
  const columns = [
    {
      title: '机构',
      dataIndex: 'KSGLJGMC',
    },
    {
      title: '场次',
      dataIndex: 'CCMC',
    },
    {
      title: '科目',
      dataIndex: 'KMMC',
    },
    {
      title: '姓名',
      dataIndex: 'XM',
    },
    {
      title: '考生号',
      dataIndex: 'KSH',
    },
    {
      title: '准考证号',
      dataIndex: 'ZKZH',
    },
    {
      title: '考区编号',
      dataIndex: 'KQBH',
    },
    {
      title: '考点编号',
      dataIndex: 'KDBH',
    },
    {
      title: '考场号',
      dataIndex: 'KCBH',
    },
    {
      title: '座位号',
      dataIndex: 'ZWH',
    },
  ]

  /**
   * redux hooks
   */
  const dispatch = useDispatch()
  const { token, userExamOrgTreeList, roundList, ksjhbm } = useSelector(
    (state) => ({
      token: state.user.get('token'),
      ksjhbm: state.user.get('ksjhbm'),
      userExamOrgTreeList: state.baseData.get('userExamOrgTreeList'),
      roundList: state.baseData.get('roundList'),
    }),
    shallowEqual
  )

  const options = userExamOrgTreeList

  /**
   * other hooks
   */
  useEffect(() => {
    searchForm.setFieldsValue(['xm', 'sfzh', 'ksh'])
  }, [searchForm])

  /**
   * other handles
   */
  // 搜索
  const handleClickSearch = async () => {
    dispatch(changeCurrentPageAction(1))
    const values = await searchForm.validateFields()
    if (values.jgid) {
      values.jgid = values.jgid[values.jgid.length - 1]
    }
    dispatch(changeSearchDataAction(values))
    dispatch(getTableListAction(getStuChoreographyList))
  }

  // 清空
  const handleClearAll = () => {
    dispatch(getClearAllAction(clearAll, getStuChoreographyList, '清空'))
  }

  // 模板下载
  const templateDownload = () => {
    const url = `${BASE_URL}/bpxx/download`
    const data = {
      method: 'get',
      url: url,
      token: token,
      fileName: '考生编排信息模板.xlsx',
    }
    exportExcelMethod(data)
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

  return (
    <div>
      <div className="basic-header">
        <Form layout="inline" form={searchForm} labelCol={{ offset: 1 }}>
          <Form.Item label="机构" name="jgid">
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
          <Form.Item label="考场" name="kcbh">
            <Select placeholder="请选择" onChange={handleClickSearch}>
              {examRoomList.map((item) => {
                return (
                  <Select.Option key={item.kcbh} value={item.kcbh}>
                    {item.kcbh}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="姓名" name="xm">
            <Input placeholder="请输入" onPressEnter={handleClickSearch} />
          </Form.Item>
          <Form.Item label="准考证号" name="zkzh">
            <Input placeholder="请输入" onPressEnter={handleClickSearch} />
          </Form.Item>
          <Form.Item label="场次" name="ccm">
            <Select placeholder="请选择" onChange={handleClickSearch}>
              {roundList.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.ccm}>
                    {item.ccmc}
                  </Select.Option>
                )
              })}
            </Select>
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
        <MyTable api={getStuChoreographyList} columns={columns} />
      </div>
      <UploadFile
        title="离线导入"
        api={getStuChoreographyList}
        apiData="/bpxx/import"
      />
    </div>
  )
})
