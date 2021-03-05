import React, { memo, useState } from 'react'

import { Row, Col } from 'antd'

import { HeaderWrapper } from './style'
import { withRouter } from 'react-router'

function Header() {
  /**
   * state and hooks
   */
  const [username] = useState('admin')

  return (
    <HeaderWrapper>
      <Row className="header-top">
        <Col span={24}>
          <span>欢迎您 {username}</span>
          <a href="/todo">退出</a>
        </Col>
      </Row>
    </HeaderWrapper>
  )
}

export default withRouter(memo(Header))
