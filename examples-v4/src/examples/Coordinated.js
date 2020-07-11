import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default () => {
  const [form] = Form.useForm()
  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
  })

  const meta = [
    {
      key: 'gender',
      label: 'Gender',
      widget: 'radio-group',
      options: ['Male', 'Female'],
      onChange: evt => {
        if (evt.target.value === 'Male') {
          form.setFieldsValue({ note: 'Hi, man!' })
        } else {
          form.setFieldsValue({ note: 'Hi, lady!' })
        }
      },
    },
    { key: 'note', label: 'Note' },
  ]

  return (
    <Form onFinish={handleFinish} form={form}>
      <FormBuilder meta={meta} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
