import React from 'react'
import { Redirect } from 'react-router-dom'

const Main = React.lazy(() => import('@/pages/main'))
const TestPlan = React.lazy(() => import('@/pages/basic-data/test-plan'))
const ReportInfo = React.lazy(() => import('@/pages/basic-data/report-info'))

const routes = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/basic-data/test-plan" />,
  },
  {
    path: '/basic-data',
    component: Main,
    routes: [
      {
        path: '/basic-data',
        exact: true,
        render: () => <Redirect to="/basic-data/test-plan" />,
      },
      {
        path: '/basic-data/test-plan',
        component: TestPlan,
      },
      {
        path: '/basic-data/report-info',
        component: ReportInfo,
      },
    ],
  },
]

export default routes