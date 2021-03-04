import React, { memo, useEffect, useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import { Menu } from 'antd'

import menuConfig from '@/config/menuConfig'
import { SiderWrapper } from './style'
const { SubMenu } = Menu

function Sider(props) {
  const [menuTreeNode, setMenuTreeNode] = useState(null)

  let pathname = props.location.pathname
  if (pathname === '/') {
    pathname = '/basic-data/test-plan'
  }
  const pathArray = pathname.split('/')
  const path = `/${pathArray[1]}`

  useEffect(() => {
    // 菜单渲染
    const renderMenu = (data) => {
      return data.map((item) => {
        if (item.children) {
          return (
            <SubMenu title={item.title} key={item.key}>
              {renderMenu(item.children)}
            </SubMenu>
          )
        }
        return (
          <Menu.Item title={item.title} key={item.key}>
            <NavLink to={item.key}>{item.title}</NavLink>
          </Menu.Item>
        )
      })
    }
    setMenuTreeNode(renderMenu(menuConfig))
  }, [])

  return (
    <SiderWrapper style={{ minHeight: '100vh', width: '256px' }}>
      <div className="logo">
        <h1>身份认证管理</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[path]}
      >
        {menuTreeNode}
      </Menu>
    </SiderWrapper>
  )
}

export default withRouter(memo(Sider))