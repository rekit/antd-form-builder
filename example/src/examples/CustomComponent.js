import React, { useCallback } from 'react'
import { Form, Button, InputNumber } from 'antd'
import FormBuilder from 'antd-form-builder'

const MOCK_USERNAMES = {
  nate: true,
  bood: true,
  kevin: true,
}
// Here define a custom component just for layout
const WeightWithUnit = props => (
  <div>
    <InputNumber {...props} /> kg
  </div>
)
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
      key: 'weight',
      label: 'Weight',
      // Set forwardRef to true if use functional component as field widget
      // to remove warnings
      forwardRef: true,
      // Here define a custom component just for layout
      widget: WeightWithUnit,
    },
    {
      key: 'gender',
      label: 'Gender',
      widget: 'radio-group',
      options: ['Male', 'Female'],
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
