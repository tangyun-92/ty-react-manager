/*
 * @Author: 唐云
 * @Date: 2021-03-05 17:17:53
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-03-08 16:55:19
 * 登录
 */
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { Form, Input, Button } from 'antd'

import { LoginWrapper } from './style'
import { getLoginAction } from '@/store/user/actionCreators'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
}

export default memo(function Login(props) {
  /**
   * state and props
   */
  const history = useHistory()

  /**
   * redux hooks
   */
  const dispatch = useDispatch()

  /**
   *other handle
   */

  /**
   * other methods
   */
  // 登录
  const onFinish = (data) => {
    history.push('/basic-data/test-plan')
    dispatch(getLoginAction({ data }))
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <LoginWrapper>
      <div className="login-title">XXX管理系统</div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(e) => onFinish(e)}
        onFinishFailed={(e) => onFinishFailed(e)}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
          initialValue={'admin'}
        >
          <Input placeholder="username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
          initialValue={'123'}
        >
          <Input.Password placeholder="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登 录
          </Button>
        </Form.Item>
      </Form>
    </LoginWrapper>
  )
})
