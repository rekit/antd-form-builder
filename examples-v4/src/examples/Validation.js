import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

const MOCK_USERNAMES = {
  nate: true,
  bood: true,
  kevin: true,
}

export default () => {
  const [form] = Form.useForm()
  const handleSubmit = useCallback(values => {
    console.log('Submit: ', values)
  })

  const meta = [
    {
      key: 'username',
      label: 'Username',
      extra: 'Note: username nate, bood or kevin already exist',
      hasFeedback: true, // Show validation status icon in the right
      required: true, // this adds an entry to rules: [{ required: true, message: 'Username is required' }]
      rules: [
        {
          validator: (rule, value, callback) => {
            // Do async validation to check if username already exists
            // Use setTimeout to emulate api call
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (MOCK_USERNAMES[value]) {
                  reject(new Error(`Username "${value}" already exists.`))
                } else {
                  resolve()
                }
              }, 1000)
            })
          },
        },
      ],
    },
    {
      key: 'password',
      label: 'Password',
      widget: 'password',
      onChange: () => {
        if (form.isFieldTouched('confirmPassword')) {
          form.validateFields(['confirmPassword'])
        }
      },
      rules: [
        // This is equivalent with "required: true"
        {
          required: true,
          message: 'Password is required',
        },
      ],
    },
    {
      key: 'confirmPassword',
      label: 'Confirm Passowrd',
      widget: 'password',
      required: true,
      rules: [
        {
          validator: (rule, value, callback) => {
            return new Promise((resolve, reject) => {
              if (value !== form.getFieldValue('password')) {
                reject(new Error('Two passwords are inconsistent.'))
              } else {
                resolve()
              }
            })
          },
        },
      ],
    },
  ]

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FormBuilder meta={meta} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}
