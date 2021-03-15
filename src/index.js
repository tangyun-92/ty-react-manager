import React from 'react'
import ReactDOM from 'react-dom'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import App from './App'
import '@/assets/css/reset.css'
import { Provider } from 'react-redux'
import store from '@/store'
import { persistor } from '@/store'
import { PersistGate } from 'redux-persist/es/integration/react'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
