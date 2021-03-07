import React from 'react'
import { Redirect } from 'react-router-dom'

const routes = [
  {
    path: '/',
    exact: true,
    requiresAuth: true,
    render: () => <Redirect to={'/basic-data/test-plan'} />,
  },
  {
    path: '/login',
    component: React.lazy(() => import('@/pages/login')),
    requiresAuth: false,
  },
  {
    path: '/basic-data',
    component: React.lazy(() => import('@/layout')),
    requiresAuth: true,
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
    ],
  },
]

export default routes
