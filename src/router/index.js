import React from 'react'
import { Redirect } from 'react-router-dom'

const routes = [
  {
    path: '/',
    exact: true,
    auth: true,
    render: () => <Redirect to={'/login'} />,
  },
  {
    path: '/login',
    component: React.lazy(() => import('@/pages/login')),
    auth: false,
  },
  {
    path: '/notFound',
    component: React.lazy(() => import('@/pages/404')),
    auth: false,
  },
  {
    path: '/basic-data',
    component: React.lazy(() => import('@/layout')),
    auth: true,
    routes: [
      {
        path: '/basic-data',
        exact: true,
        render: () => <Redirect to={'/basic-data/test-plan'} />,
      },
      {
        path: '/basic-data/test-plan',
        component: React.lazy(() => import('@/pages/basic-data/test-plan')),
      },
      {
        path: '/basic-data/report-info',
        component: React.lazy(() => import('@/pages/basic-data/report-info')),
      },
      {
        path: '/basic-data/stu-choreography',
        component: React.lazy(() =>
          import('@/pages/basic-data/stu-choreography')
        ),
      },
      {
        path: '/basic-data/per-info',
        component: React.lazy(() => import('@/pages/basic-data/per-info')),
      },
      {
        path: '/basic-data/per-arrangement',
        component: React.lazy(() =>
          import('@/pages/basic-data/per-arrangement')
        ),
      },
    ],
  },
]

export default routes
