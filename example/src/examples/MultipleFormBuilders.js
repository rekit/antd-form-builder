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
  const meta1 = [
    { key: 'name.first', label: 'First Name', required: true },
    { key: 'name.last', label: 'Last Name', required: true },
    { key: 'dob', label: 'Date of Birth', widget: 'date-picker' },
  ]
  const meta2 = [
    {
      key: 'email',
      label: 'Email',
      rules: [{ type: 'email', message: 'Invalid email' }],
    },
    {
      key: 'security',
      label: 'Security Question',
      widget: 'select',
      placeholder: 'Select a question...',
      options: ["What's your pet's name?", 'Your nick name?'],
    },
    { key: 'answer', label: 'Security Answer' },
  ]
  const meta3 = {
    fields: [
      { key: 'address', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'phone', label: 'phone' },
    ],
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit} style={{ width: '500px' }}>
      <fieldset>
        <legend>Personal Information</legend>
        <FormBuilder form={form} meta={meta1} />
      </fieldset>
      <fieldset>
        <legend>Account Information</legend>
        <FormBuilder form={form} meta={meta2} />
      </fieldset>
      <fieldset>
        <legend>Contact Infomation</legend>
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
