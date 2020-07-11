import React, { useState, useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default () => {
  const [form] = Form.useForm()
  const [columns, setColumns] = useState(2)
  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
  })
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
        help: 'Change columns to show layout change',
      },
      { key: 'input', label: 'Input', required: true, tooltip: 'This is the name.' },
      {
        key: 'checkbox',
        label: 'Checkbox',
        widget: 'checkbox',
        initialValue: true,
      },
      { key: 'select', label: 'Select', widget: 'select', options: ['Apple', 'Orange', 'Banana'] },
      { key: 'password', label: 'Password', widget: 'password' },
      { key: 'textarea', label: 'Textarea', widget: 'textarea' },
      { key: 'number', label: 'Number', widget: 'number' },
      { key: 'date-picker', label: 'Date Picker', widget: 'date-picker' },
    ],
  }
  return (
    <Form form={form} layout="horizontal" onFinish={handleFinish} style={{ width: '1000px' }}>
      <FormBuilder meta={meta} form={form} />
      <Form.Item className="form-footer">
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
