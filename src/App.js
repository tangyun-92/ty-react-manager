import React, { memo, Suspense } from 'react'
import { HashRouter } from 'react-router-dom'

import { Spin } from 'antd'

import routes from '@/router'
import renderRoutes from '@/utils/renderRoutes'

const loginStatus = true // 登录开关
const authPath = '/login' // 默认未登录的时候返回的页面

const App = () => {
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="example">
            <Spin size="large" tip="Loading..." />
          </div>
        }
      >
        {renderRoutes(routes, loginStatus, authPath)}
      </Suspense>
    </HashRouter>
  )
}

export default memo(App)
