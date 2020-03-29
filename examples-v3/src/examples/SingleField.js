import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default Form.create()(function SingleField({ form }) {
  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault()
      console.log('Submit: ', form.getFieldsValue())
    },
    [form],
  )

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormBuilder form={form} meta={{ key: 'username', placeholder: 'Username' }} />
      <FormBuilder
        form={form}
        meta={{ key: 'password', widget: 'password', placeholder: 'Password' }}
      />
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
})
