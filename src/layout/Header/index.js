import React, { memo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Row, Col, Select, Modal, Button } from 'antd'

import { HeaderWrapper } from './style'
import {
  changeTokenAction,
  changeResetUserAction,
  changeCurrentExamPlanAction,
  changeLoginStatusAction,
} from '@/store/user/actionCreators'

const { Option } = Select

function Header() {
  /**
   * state and hooks
   */
  const [currentVal, setCurrentVal] = useState('')

  /**
   * react hooks
   */
  const dispatch = useDispatch()
  const { username, examList, currentExamPlan, loginStatus } = useSelector(
    (state) => ({
      username: state.user.get('username'),
      examList: state.user.get('examList'),
      currentExamPlan: state.user.get('currentExamPlan'),
      loginStatus: state.user.get('loginStatus'),
    }),
    shallowEqual
  )

  /**
   * other handles
   */
  const handleLayout = () => {
    dispatch(changeTokenAction(''))
    dispatch(changeResetUserAction(''))
  }

  const handleChangeExamList = (e) => {
    setCurrentVal(e.label)
  }
  const handleOk = () => {
    dispatch(changeCurrentExamPlanAction(currentVal))
    dispatch(changeLoginStatusAction(false))
  }

  const handleChangeModal = () => {
    dispatch(changeLoginStatusAction(true))
  }

  return (
    <HeaderWrapper>
      <Row className="header-top">
        <Col
          span={12}
          onClick={(e) => handleChangeModal()}
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
          onChange={(e) => handleChangeExamList(e)}
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
