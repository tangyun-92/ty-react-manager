import React, { memo, useState, useEffect } from 'react'
import moment from 'moment'

import { Row, Col } from 'antd'

import { HeaderWrapper } from './style'

export default memo(function Header() {
  const [username] = useState('admin')
  const [sysTime, setSysTime] = useState('')

  useEffect(() => {
    setInterval(() => {
      let sysTime = moment().format('YYYY-MM-DD HH:mm:ss')
      setSysTime(sysTime)
    }, 1000)
  })

  return (
    <HeaderWrapper className="header">
      <Row className="header-top">
        <Col span={24}>
          <span>欢迎您 {username}</span>
          <a href="/todo">退出</a>
        </Col>
      </Row>
      <Row className="breadcrumb">
        <Col span={4} className="breadcrumb-title">
          首页
        </Col>
        <Col span={20} className="weather">
          <span>{sysTime}</span>
        </Col>
      </Row>
    </HeaderWrapper>
  )
})
