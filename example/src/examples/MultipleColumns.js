import React, { useState, useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default Form.create()(({ form }) => {
  const [columns, setColumns] = useState(2)
  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault()
      console.log('Submit: ', form.getFieldsValue())
    },
    [form],
  )
  const meta = {
    columns,
    fields: [
      {
        key: 'columns',
        label: 'Columns',
        widget: 'radio-group',
        buttonGroup: true,
        widgetProps: { buttonStyle: 'solid', onChange: evt => setColumns(evt.target.value) },
        options: [1, 2, 3, 4],
        initialValue: 2,
      },
      { key: 'input', label: 'Input', required: true, tooltip: 'This is the name.' },
      { key: 'checkbox', label: 'Checkbox', widget: 'checkbox', initialValue: true },
      { key: 'select', label: 'Select', widget: 'select', options: ['Apple', 'Orange', 'Banana'] },
      { key: 'password', label: 'Password', widget: 'password' },
      { key: 'textarea', label: 'Textarea', widget: 'textarea' },
      { key: 'number', label: 'Number', widget: 'number' },
      { key: 'date-picker', label: 'Date Picker', widget: 'date-picker' },
    ],
  }
  return (
    <Form layout="horizontal" onSubmit={handleSubmit} style={{ width: '1000px' }}>
      <FormBuilder form={form} meta={meta} />
      <Form.Item className="form-footer">
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
})
