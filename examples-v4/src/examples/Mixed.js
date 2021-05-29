import React, { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default () => {
  const [form] = Form.useForm()
  const forceUpdate = FormBuilder.useForceUpdate()
  const handleFinish = useCallback(values => console.log('Submit: ', values), [])
  const meta1 = [
    { key: 'name.first', label: 'First Name', required: true },
    { key: 'name.last', label: 'Last Name', required: true },
    { key: 'dob', label: 'Date of Birth', widget: 'date-picker' },
  ]
  const meta2 = {
    key: 'email',
    label: 'Email',
    rules: [{ type: 'email', message: 'Invalid email' }],
  }

  const prefixMeta = {
    key: 'prefix',
    options: ['+86', '+87'],
    widget: 'select',
    noFormItem: true,
    widgetProps: {
      style: { width: 70 },
    },
  }
  const prefixSelector = <FormBuilder meta={prefixMeta} form={form} />

  return (
    <Form
      layout="horizontal"
      form={form}
      onFinish={handleFinish}
      style={{ width: '500px' }}
      onValuesChange={forceUpdate}
    >
      <FormBuilder meta={meta1} form={form} />
      <Form.Item
        label="Phone Number"
        name="phone"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>
      <FormBuilder meta={meta2} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }} className="form-footer">
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
