import React, { memo, Suspense, useState } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { Layout, Spin } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

import routes from '@/router'
import TYHeader from '@/layout/Header'
import TYSider from '@/layout/Sider'
import TYBreadcrumb from '@/layout/Breadcrumb'

const { Header, Content, Sider } = Layout

function App() {
  const [collapsed, setCollapsed] = useState(false)

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
            width={256}
            style={{
              overflow: 'auto',
              height: 'calc(100vh - 0px)',
            }}
            collapsible
            collapsed={collapsed}
            trigger={null}
          >
            <TYSider />
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                background: '#fff',
                textAlign: 'center',
                padding: 0,
                height: '60px',
                display: 'flex',
              }}
            >
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
              <div
                style={{
                  padding: 24,
                  background: '#fff',
                  minHeight: 'calc(100vh - 130px)',
                }}
              >
                {renderRoutes(routes)}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Suspense>
    </HashRouter>
  )
}

export default memo(App)
