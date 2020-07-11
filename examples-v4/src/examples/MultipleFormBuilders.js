import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default () => {
  const [form] = Form.useForm()
  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
  })
  const meta1 = [
    { key: 'name.first', label: 'First Name', required: true },
    { key: 'name.last', label: 'Last Name', required: true },
    { key: 'dob', label: 'Date of Birth', widget: 'date-picker' },
  ]
  const meta2 = [
    {
      key: 'email',
      label: 'Email',
      rules: [{ type: 'email', message: 'Invalid email' }],
    },
    {
      key: 'security',
      label: 'Security Question',
      widget: 'select',
      placeholder: 'Select a question...',
      options: ["What's your pet's name?", 'Your nick name?'],
    },
    { key: 'answer', label: 'Security Answer' },
  ]
  const meta3 = {
    fields: [
      { key: 'address', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'phone', label: 'phone' },
    ],
  }

  return (
    <Form layout="horizontal" form={form} onFinish={handleFinish} style={{ width: '500px' }}>
      <fieldset>
        <legend>Personal Information</legend>
        <FormBuilder form={form} meta={meta1} />
      </fieldset>
      <fieldset>
        <legend>Account Information</legend>
        <FormBuilder form={form} meta={meta2} />
      </fieldset>
      <fieldset>
        <legend>Contact Infomation</legend>
        <FormBuilder form={form} meta={meta3} />
      </fieldset>
      <Form.Item className="form-footer" wrapperCol={{ span: 16, offset: 8 }}>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
