import axios from 'axios'

import { message } from 'antd'

/**
 * 根据后端返回的文件流转为excel导出
 * @param {Object} data
 */
export function exportExcelMethod(data) {
  return axios({
    method: data.method,
    url: `${data.url}${data.params ? '?' + data.params : ''}`,
    // url: data.url,
    responseType: 'blob',
    headers: {
      'Sfrz-Manage-Token': data.token,
    },
    timeout: 15000,
    data: data.data,
  })
    .then((res) => {
      const link = document.createElement('a')
      const blob = new Blob([res.data], {
        type: 'application/vnd.ms-excel',
      })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)

      //判断是否IE浏览器
      function isIE() {
        if (!!window.ActiveXObject || 'ActiveXObject' in window) {
          return true
        } else {
          return false
        }
      }
      if (data.fileName) {
        link.download = data.fileName //下载的文件名
      } else {
        const fileName = decodeURI(
          res.headers['content-disposition'].split('=')[1]
        )
        link.download = fileName
      }
      if (isIE()) {
        // 兼容ie
        window.navigator.msSaveOrOpenBlob(blob, link.download)
      } else {
        // link.download = res.headers['content-disposition'] //下载后文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      message.success('操作成功！')
    })
    .catch((error) => {
      console.log(error)
      message.error(error)
    })
}
