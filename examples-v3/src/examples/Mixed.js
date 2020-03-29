import React, { useCallback } from 'react'
import { Form, Select, Input, Button } from 'antd'
import FormBuilder from 'antd-form-builder'
const { Option } = Select
export default Form.create()(({ form }) => {
  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault()
      console.log('Submit: ', form.getFieldsValue())
    },
    [form],
  )
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

  const prefixSelector = form.getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>,
  )

  return (
    <Form layout="horizontal" onSubmit={handleSubmit} style={{ width: '500px' }}>
      <FormBuilder meta={meta1} form={form} />
      <Form.Item label="Phone Number" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        {form.getFieldDecorator('phone', {
          rules: [{ required: true, message: 'Please input your phone number!' }],
        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
      </Form.Item>
      <FormBuilder meta={meta2} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }} className="form-footer">
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
})
