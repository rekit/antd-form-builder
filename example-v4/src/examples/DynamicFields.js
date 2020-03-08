import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default () => {
  const [form] = FormBuilder.useForm()
  const handleFinish = useCallback(
    evt => {
      evt.preventDefault()
      console.log('Submit: ', form.getFieldsValue())
    },
    [form],
  )

  const meta = [
    {
      key: 'favoriteFruit',
      label: 'Favorite Fruit',
      widget: 'radio-group',
      dynamic: true,
      options: ['Apple', 'Orange', 'Other'],
      initialValue: 'Apple',
    },
  ]

  // Push other input if choose others
  if (form.getFieldValue('favoriteFruit') === 'Other') {
    meta.push({
      key: 'otherFruit',
      label: 'Other',
    })
  }

  return (
    <Form form={form} onValuesChange={form.handleValuesChange} onFinish={handleFinish}>
      <FormBuilder meta={meta} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
