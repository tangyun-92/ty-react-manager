/*
 * @Author: 唐云
 * @Date: 2021-03-18 09:56:14
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-18 11:10:02
 * 工作人员信息
 */
import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Form, Input, Button, Tag, Select, Cascader } from 'antd'

import UploadFile from '@/components/uploadFile'
import MyTable from '@/components/MyTable'
import {
  getPerInfoList,
  clearAll,
  getJobDutyCode,
} from '@/api/basic-data/per-info'
import {
  changeCurrentPageAction,
  changeImportModalStatusAction,
  changeSearchDataAction,
  getClearAllAction,
  getTableListAction,
} from '@/store/common/actionCreators'
import { exportExcelMethod, objectToArray } from '@/utils'
import { BASE_URL } from '@/services/config'

export default memo(function PerInfo() {
  /**
   * state and props
   */
  const [searchForm] = Form.useForm() // 搜索form
  const [jobDuty, setJobDuty] = useState([])

  // table
  const columns = [
    {
      title: '考试项目编号',
      dataIndex: 'ksjhbm',
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
      title: '证件类型',
      dataIndex: 'sfzjlx',
    },
    {
      title: '身份证件号码',
      dataIndex: 'sfzjhm',
    },
    {
      title: '联系电话',
      dataIndex: 'lxdh',
    },
    {
      title: '岗位职责',
      dataIndex: 'gwzz',
    },
    {
      title: '机构',
      dataIndex: 'ksgljgmc',
    },
  ]

  /**
   * redux hooks
   */
  const dispatch = useDispatch()
  const { token, userExamOrgTreeList } = useSelector(
    (state) => ({
      token: state.user.get('token'),
      userExamOrgTreeList: state.baseData.get('userExamOrgTreeList'),
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
  useEffect(() => {
    // 获取岗位职责码表数据
    getJobDutyCode().then((res) => {
      setJobDuty(objectToArray(res.data))
    })
  }, [])

  /**
   * other handles
   */
  // 搜索
  const handleClickSearch = async () => {
    dispatch(changeCurrentPageAction(1))
    const values = await searchForm.validateFields()
    values.ksjg = values.ksjg[values.ksjg.length - 1]
    dispatch(changeSearchDataAction(values))
    dispatch(getTableListAction(getPerInfoList))
  }

  // 清空
  const handleClearAll = () => {
    dispatch(getClearAllAction(clearAll, getPerInfoList, '清空'))
  }

  // 模板下载
  const templateDownload = () => {
    const url = `${BASE_URL}/gzry/downloadExcel`
    const data = {
      method: 'get',
      url: url,
      token: token,
      fileName: '工作人员信息模板.xlsx',
    }
    exportExcelMethod(data)
  }

  // 始终选中最后点击的级联数据
  const displayRender = (label) => {
    return label[label.length - 1]
  }

  return (
    <div>
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
              onChange={handleClickSearch}
            />
          </Form.Item>
          <Form.Item label="岗位职责" name="gwzzm">
            <Select placeholder="请选择" onChange={handleClickSearch}>
              {jobDuty.map((item) => {
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
          <Form.Item label="身份证号" name="sfzjhm">
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
        <MyTable api={getPerInfoList} columns={columns} />
      </div>
      <UploadFile
        title="离线导入"
        api={getPerInfoList}
        apiData="/gzry/gzryImport"
      />
    </div>
  )
})
