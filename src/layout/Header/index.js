import React, { memo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Row, Col, Select, Modal, Button } from 'antd'

import { HeaderWrapper } from './style'
import {
  changeTokenAction,
  changeResetUserAction,
  getCurrentExamPlanAction,
  changeLoginStatusAction,
} from '@/store/user/actionCreators'
import { getBaseDataAction } from '@/store/base-data/actionCreators'

const { Option } = Select

function Header() {
  /**
   * state and hooks
   */
  const [currentVal, setCurrentVal] = useState('') // 考试计划select选中的值

  /**
   * react hooks
   */
  const dispatch = useDispatch()
  const { username, examList, currentExamPlan, loginStatus } = useSelector(
    (state) => ({
      username: state.user.get('username'), // 用户名
      examList: state.user.get('examList'), // 考试计划列表
      currentExamPlan: state.user.get('currentExamPlan'), // 选中的考试计划
      loginStatus: state.user.get('loginStatus'), // 登录状态
    }),
    shallowEqual
  )

  /**
   * other handles
   */
  // 退出登录
  const handleLayout = () => {
    dispatch(changeTokenAction(''))
    dispatch(changeResetUserAction(''))
  }

  // 切换考试计划
  const handleOk = () => {
    dispatch(getCurrentExamPlanAction(currentVal))
    dispatch(getBaseDataAction())
    dispatch(changeLoginStatusAction(false))
  }

  return (
    <HeaderWrapper>
      <Row className="header-top">
        <Col
          span={12}
          onClick={(e) => dispatch(changeLoginStatusAction(true))}
          className="exam-list"
        >
          {currentExamPlan}
        </Col>
        <Col span={12}>
          <span>欢迎您 {username}</span>
          <span className="layout" onClick={(e) => handleLayout()}>
            退出
          </span>
        </Col>
      </Row>
      <Modal
        title="考试计划"
        visible={loginStatus}
        closable={false}
        keyboard={false}
        maskClosable={false}
        width={400}
        footer={[
          <Button key="submit" type="primary" onClick={(e) => handleOk()}>
            确定
          </Button>,
        ]}
      >
        <Select
          placeholder="请选择考试计划"
          style={{ width: 320 }}
          labelInValue
          onChange={(e) => setCurrentVal(e)}
        >
          {examList.map((item, index) => {
            return (
              <Option value={item.ksjhbm} key={item.ksjhbm}>
                {item.ksjhmc}
              </Option>
            )
          })}
        </Select>
      </Modal>
    </HeaderWrapper>
  )
}

export default memo(Header)
