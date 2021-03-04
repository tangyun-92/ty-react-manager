import React, { memo, Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { Layout, Spin } from 'antd'

import routes from '@/router'
import TYHeader from '@/layout/Header'
import TYSider from '@/layout/Sider'

const { Header, Content, Sider } = Layout

export default memo(function App() {
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
          <Sider width={256} style={{ minHeight: '100vh' }}>
            <TYSider />
          </Sider>
          <Layout>
            <Header
              style={{ background: '#fff', textAlign: 'center', padding: 0 }}
            >
              <TYHeader />
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div
                style={{
                  padding: 24,
                  background: '#fff',
                  minHeight: 'calc(100vh - 100px)',
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
})
