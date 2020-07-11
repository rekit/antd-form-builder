import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default () => {
  const [form] = Form.useForm()
  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
  })

  const getMeta = useCallback(() => {
    const meta = [
      {
        key: 'favoriteFruit',
        label: 'Favorite Fruit',
        widget: 'radio-group',
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
    return meta
  }, [form])

  return (
    <Form form={form} onFinish={handleFinish}>
      <FormBuilder getMeta={getMeta} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
