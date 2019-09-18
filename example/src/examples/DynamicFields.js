import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default Form.create()(({ form }) => {
  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault()
      console.log('Submit: ', form.getFieldsValue())
    },
    [form],
  )

  const meta = {
    elements: [
      {
        key: 'favoriteFruit',
        label: 'Favorite Fruit',
        widget: 'radio-group',
        options: ['Apple', 'Orange', 'Other'],
        initialValue: 'Apple',
      },
    ],
  }

  // Push other input if choose others
  if (form.getFieldValue('favoriteFruit') === 'Other') {
    meta.elements.push({
      key: 'otherFruit',
      label: 'Others',
    })
  }

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
