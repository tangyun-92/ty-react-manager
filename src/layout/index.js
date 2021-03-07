import React, { memo, Suspense, useState } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { Layout, Spin } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

import TYHeader from '@/layout/Header'
import TYSider from '@/layout/Sider'
import TYBreadcrumb from '@/layout/Breadcrumb'
import { shallowEqual, useSelector } from 'react-redux'

const { Header, Content, Sider } = Layout

function Main(props) {
  /**
   * state and props
   */
  const { route } = props
  const [collapsed, setCollapsed] = useState(false)

  /**
   * redux hooks
   */
  const { username } = useSelector(
    (state) => ({
      username: state.user.get('username'),
    }),
    shallowEqual
  )

  /**
   * other handle
   */
  if (!username) {
    props.history.push('/login')
  }
  
  /**
   * other methods
   */
  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="example">
            <Spin size="large" tip="Loading..." />
          </div>
        }
      >
        <Layout>
          <Sider
            className="sider"
            width={256}
            collapsible
            collapsed={collapsed}
            trigger={null}
            style={{ overflow: 'auto', height: 'calc(100vh - 0px)' }}
          >
            <TYSider />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: toggle,
                }
              )}
              <TYHeader />
            </Header>
            <TYBreadcrumb />
            <Content
              style={{ margin: '0 16px' }}
              className="site-layout-background"
            >
              <div className="content">{renderRoutes(route.routes)}</div>
            </Content>
          </Layout>
        </Layout>
      </Suspense>
    </HashRouter>
  )
}

export default memo(Main)
