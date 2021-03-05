import React, { memo, Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import renderRoutes from '@/utils/renderRoutes'

import { Spin } from 'antd'

import routes from '@/router'

import Layout from '@/layout'

const authed = false // 如果登陆之后可以利用redux修改该值(关于redux不在我们这篇文章的讨论范围之内）
const authPath = '/login' // 默认未登录的时候返回的页面，可以自行设置

function App() {
  if (authed) {
    return <Layout />
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
          {renderRoutes(routes, authed, authPath)}
        </Suspense>
      </HashRouter>
    )
}

export default memo(App)
