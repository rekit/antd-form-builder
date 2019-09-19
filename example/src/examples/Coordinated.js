import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

const MOCK_USERNAMES = {
  nate: true,
  bood: true,
  kevin: true,
}

export default Form.create()(({ form }) => {
  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault()
      form.validateFields((err, values) => {
        if (err) return
        console.log('Submit: ', form.getFieldsValue())
      })
    },
    [form],
  )

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
    <Form onSubmit={handleSubmit}>
      <FormBuilder meta={meta} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
})
