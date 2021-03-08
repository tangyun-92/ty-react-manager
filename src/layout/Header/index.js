import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Row, Col } from 'antd'

import { HeaderWrapper } from './style'
import { changeTokenAction } from '@/store/user/actionCreators'

function Header() {
  /**
   * state and hooks
   */
  const [username] = useState('admin')

  /**
   * react hooks
   */
  const dispatch = useDispatch()

  /**
   * other handles
   */
  const handleLayout = () => {
    dispatch(changeTokenAction(''))
    localStorage.setItem('persist:root', '')
  }

  return (
    <HeaderWrapper>
      <Row className="header-top">
        <Col span={24}>
          <span>欢迎您 {username}</span>
          <span className="layout" onClick={(e) => handleLayout()}>
            退出
          </span>
        </Col>
      </Row>
    </HeaderWrapper>
  )
}

export default memo(Header)
