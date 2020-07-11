import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default () => {
  const [form] = Form.useForm()
  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
  })
  const meta = {
    columns: 4,
    formItemLayout: null, // Must set this for inline layout
    colon: true,
    fields: [
      {
        key: 'label1',
        colSpan: 4,
        render() {
          return (
            <fieldset>
              <legend>Contact Infomation</legend>
            </fieldset>
          )
        },
      },
      { key: 'address', label: 'Address', colSpan: 4 },
      { key: 'address2', label: 'Address2', colSpan: 4 },
      { key: 'city', label: 'City', colSpan: 2 },
      { key: 'state', label: 'State' },
      { key: 'zip', label: 'Zip Code' },
      {
        key: 'label1',
        colSpan: 4,
        render() {
          return (
            <fieldset>
              <legend>Bed &amp; Bath</legend>
            </fieldset>
          )
        },
      },
      {
        key: 'homeType',
        label: 'Home Type',
        colSpan: 2,
        widget: 'select',
        initialValue: 'House',
        options: ['House', 'Apartment'],
      },
      {
        key: 'roomType',
        label: 'Room Type',
        colSpan: 2,
        widget: 'select',
        initialValue: 'Entire home/apt',
        options: ['Entire home/apt', 'Shared'],
      },
      {
        key: 'bedrooms',
        label: 'Bedrooms',
        colSpan: 2,
        widget: 'select',
        options: ['1 Bedroom', '2 Bedrooms'],
      },
      {
        key: 'bathrooms',
        label: 'Bathrooms',
        colSpan: 2,
        widget: 'select',
        options: ['1 Bathroom', '2 Bathrooms'],
      },
      {
        key: 'king',
        label: 'King',
        widget: 'number',
        widgetProps: { style: { width: '100%' } },
        initialValue: 0,
      },
      {
        key: 'queen',
        label: 'Queen',
        widget: 'number',
        widgetProps: { style: { width: '100%' } },
        initialValue: 0,
      },
      {
        key: 'full',
        label: 'Full',
        widget: 'number',
        widgetProps: { style: { width: '100%' } },
        initialValue: 0,
      },
      {
        key: 'twin',
        label: 'Twin',
        widget: 'number',
        widgetProps: { style: { width: '100%' } },
        initialValue: 0,
      },
    ],
  }

  return (
    <Form form={form} layout="vertical" onSubmit={handleFinish}>
      <FormBuilder form={form} meta={meta} />
      <Form.Item>
        <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
