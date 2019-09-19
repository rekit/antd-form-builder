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
  const meta1 = { key: 'input', label: 'Input', required: true, tooltip: 'This is the name.' }
  const meta2 = [
    { key: 'input', label: 'Input', required: true, tooltip: 'This is the name.' },
    { key: 'checkbox', label: 'Checkbox', widget: 'checkbox', initialValue: true },
  ]
  const meta3 = {
    columns: 3,
    fields: [
      { key: 'textarea', label: 'Textarea', widget: 'textarea' },
      { key: 'number', label: 'Number', widget: 'number' },
      { key: 'date-picker', label: 'Date Picker', widget: 'date-picker' },
    ],
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit} style={{ width: '1000px' }}>
      <fieldset>
        <legend>Part 1</legend>
        <FormBuilder form={form} meta={meta1} />
      </fieldset>
      <fieldset>
        <legend>Part 2</legend>
        <FormBuilder form={form} meta={meta2} />
      </fieldset>
      <fieldset>
        <legend>Part 3</legend>
        <FormBuilder form={form} meta={meta3} />
      </fieldset>
      <Form.Item className="form-footer">
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
})
