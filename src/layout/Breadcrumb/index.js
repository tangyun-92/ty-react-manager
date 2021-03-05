/*
 * @Author: 唐云
 * @Date: 2021-03-05 16:53:44
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-05 21:38:49
 * 面包屑
 */
import React, { memo } from 'react'
import { Breadcrumb } from 'antd'
import { withRouter } from 'react-router'

import menuConfig from '@/config/menuConfig'

function TYBreadcrumb(props) {
  let menuArray = []
  const pathname = props.location.pathname
  if (pathname !== '/login' && pathname !== '/' && pathname !== '/basic-data') {
    const pathnameArray = pathname.split('/')
    let currentMenu = menuConfig.find((item) => {
      return `/${pathnameArray[1]}` === item.key
    })
    let currentSubMenu = currentMenu.children.find((item) => {
      return pathname === item.key
    })
    menuArray.push(currentMenu.title)
    menuArray.push(currentSubMenu.title)
  }

  return (
    <div>
      <Breadcrumb style={{ margin: '20px' }}>
        {menuArray.map((item) => {
          return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
        })}
      </Breadcrumb>
    </div>
  )
}

export default withRouter(memo(TYBreadcrumb))
