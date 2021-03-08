import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Layout from '@/layout'
import { shallowEqual, useSelector } from 'react-redux'

function FrontendAuth(props) {
  const { routerConfig, location } = props
  const { pathname } = location
  const pathnameArr = '/' + pathname.split('/')[1]

  const { username } = useSelector(
    (state) => ({
      username: state.user.get('username'),
    }),
    shallowEqual
  )
  // const username = ''

  // 如果该路由不用进行权限校验，登录状态下登陆页除外
  // 因为登陆后，无法跳转到登陆页
  // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
  const targetRouterConfig = routerConfig.find(
    (item) => item.path === pathnameArr
  )
  console.log(targetRouterConfig)
  if (username) {
    // 如果用户已登录
    if (pathname === '/login') {
      // 访问登录页面重定向到首页
      return <Redirect to="/basic-data/test-plan" />
    } else {
      // 如果路由合法且不等于notFound，判断路由是否存在，存在跳转到对应页面
      if (targetRouterConfig && targetRouterConfig.path !== '/notFound') {
        const now = targetRouterConfig.routes.find(
          (item) => item.path === pathname
        )
        if (now) {
          return (
            <div>
              <Redirect to={pathname} />
              <Layout routes={targetRouterConfig} />
            </div>
          )
        } else {
          // 不存在跳转到notFound
          return (
            <div>
              <Redirect to="/notFound" />
              <Route path="/notFound" component={targetRouterConfig.component}
              />
            </div>
          )
        }
      } else {
        return (
          <div>
            <Redirect to="/notFound" />
            <Route path="/notFound" component={targetRouterConfig.component} />
          </div>
        )
      }
    }
  } else {
    // 如果未登录且不需要鉴权，跳转到登录页面
    if (targetRouterConfig && !targetRouterConfig.auth) {
      return (
        <div>
          <Redirect to="/login" />
          <Route path="/login" component={targetRouterConfig.component} />
        </div>
      )
    } else {
      return (
        <div>
          <Redirect to="/notFound" />
        </div>
      )
    }
  }
}
export default FrontendAuth
