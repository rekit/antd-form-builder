import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default () => {
  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
  })

  return (
    <Form layout="inline" onFinish={handleFinish}>
      <FormBuilder meta={{ key: 'username', placeholder: 'Username' }} />
      <FormBuilder meta={{ key: 'password', widget: 'password', placeholder: 'Password' }} />
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}
