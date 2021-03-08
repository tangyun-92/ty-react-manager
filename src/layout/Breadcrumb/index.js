/*
 * @Author: 唐云
 * @Date: 2021-03-05 16:53:44
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-08 17:15:43
 * 面包屑
 */
import React, { memo } from 'react'
import { Breadcrumb } from 'antd'
import { useHistory } from 'react-router'

import menuConfig from '@/config/menuConfig'

function TYBreadcrumb() {
  /**
   * state and props
   */
  const history = useHistory()

  /**
   * other handles
   */
  let menuArray = []
  const pathname = history.location.pathname
  if (pathname !== '/login' && pathname !== '/' && pathname !== '/basic-data') {
    const pathnameArray = pathname.split('/')
    let currentMenu = menuConfig.find((item) => {
      return `/${pathnameArray[1]}` === item.key
    })
    if (currentMenu) {
      let currentSubMenu = currentMenu.children.find((item) => {
        return pathname === item.key
      })
      if (currentSubMenu) {
        menuArray.push(currentMenu.title)
        menuArray.push(currentSubMenu.title)
      }
    }
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

export default memo(TYBreadcrumb)
