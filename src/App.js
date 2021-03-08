import React, { memo, Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { Spin } from 'antd'

import routes from '@/router'
import FrontendAuth from '@/utils/FrontendAuth' // 鉴权

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="example">
            <Spin size="large" tip="Loading..." />
          </div>
        }
      >
        <Switch>
          <FrontendAuth routerConfig={routes}></FrontendAuth>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default memo(App)
