import React, { useState, useCallback } from 'react'
import { Form, Button, Modal } from 'antd'
import FormBuilder from 'antd-form-builder'

export default () => {
  const [form] = Form.useForm()
  const [modalVisible, setModalVisible] = useState(false)
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible])
  const hideModal = useCallback(() => setModalVisible(false), [setModalVisible])
  const [pending, setPending] = useState(false)
  const handleFinish = useCallback(
    values => {
      setPending(true)
      console.log('submit: ', values)
      setTimeout(() => {
        setPending(false)
        Modal.success({ title: 'Success', content: 'Submit success.', onOk: hideModal })
      }, 2000)
    },
    [setPending, hideModal],
  )

  const meta = {
    disabled: pending,
    fields: [{ key: 'name', label: 'Name', required: true }, { key: 'desc', label: 'Description' }],
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        New Item
      </Button>
      <Modal
        title="New Item"
        closable={!pending}
        maskClosable={!pending}
        visible={modalVisible}
        destroyOnClose
        onOk={() => form.submit()}
        onCancel={hideModal}
        okText={pending ? 'Loading...' : 'Ok'}
        okButtonProps={{ loading: pending, disabled: pending }}
        cancelButtonProps={{ disabled: pending }}
      >
        <Form form={form} onFinish={handleFinish}>
          <FormBuilder meta={meta} form={form} />
        </Form>
      </Modal>
    </div>
  )
}
