import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Modal, Table, Form, Input, message } from 'antd'

import { changeOtherModalStatusAction } from '@/store/common/actionCreators'
import { updateTestPlanParam } from '@/api/basic-data/test-plan'

const EditableContext = React.createContext(null)
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

export default memo(function ParamForm(props) {
  /**
   * state and props
   */
  const { paramInfo } = props
  const [dataSource, setDataSource] = useState([])

  let columns = [
    {
      title: '参数名称',
      dataIndex: 'csmc',
    },
    {
      title: '参数值',
      dataIndex: 'csz',
      width: '30%',
      editable: true,
    },
    {
      title: '参数说明',
      dataIndex: 'cssm',
    },
  ]

  /**
   * redux hooks
   */
  const { modalTitle, otherModalStatus } = useSelector(
    (state) => ({
      modalTitle: state.common.get('modalTitle'),
      otherModalStatus: state.common.get('otherModalStatus'),
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  /**
   * other hooks
   */
  useEffect(() => {
    setDataSource(paramInfo)
  }, [paramInfo])

  /**
   * other handles
   */
  // 编辑单元格
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const form = useContext(EditableContext)
    useEffect(() => {
      if (editing) {
        inputRef.current.focus()
      }
    }, [editing])

    const toggleEdit = () => {
      setEditing(!editing)
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      })
    }

    const save = async () => {
      try {
        const values = await form.validateFields()
        toggleEdit()
        handleSave({ ...record, ...values })
      } catch (errInfo) {
        console.log('Save failed:', errInfo)
      }
    }

    handleSave = (row) => {
      const newData = [...dataSource]
      const index = newData.findIndex((item) => row.id === item.id)
      const item = newData[index]
      newData.splice(index, 1, { ...item, ...row })
      setDataSource(newData)
    }

    let childNode = children

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      )
    }

    return <td {...restProps}>{childNode}</td>
  }

  // 覆盖默认的table元素
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  columns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: col.handleSave,
      }),
    }
  })

  // 取消
  const onCancel = () => {
    dispatch(changeOtherModalStatusAction(false))
  }

  // 参数配置提交
  const onOk = () => {
    updateTestPlanParam(dataSource).then((res) => {
      message.success(res.message)
      dispatch(changeOtherModalStatusAction(false))
    })
  }

  return (
    <div>
      <Modal
        title={modalTitle}
        visible={otherModalStatus}
        onCancel={(e) => onCancel()}
        onOk={() => onOk()}
        okText="保存"
        width={600}
        forceRender
      >
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.id}
        />
      </Modal>
    </div>
  )
})
