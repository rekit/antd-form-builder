import React, { useCallback } from 'react'
import { Form, Button, Input, Select, InputNumber, Row, Col } from 'antd'
import FormBuilder from 'antd-form-builder'

const Option = Select.Option
// Here define a custom component just for layout
// For demo, it accept price string like "18.8 USD"
const PriceInput = ({ value, onChange }) =>
  value ? (
    <Row gutter={10}>
      <Col span={16}>
        <InputNumber
          style={{ width: '100%' }}
          value={value.price}
          onChange={v => onChange({ price: v, currency: value.currency })}
        />
      </Col>
      <Col span={8}>
        <Select
          value={value.currency}
          onChange={v => onChange({ price: value.price, currency: v })}
        >
          <Option value="RMB">RMB</Option>
          <Option value="USD">USD</Option>
        </Select>
      </Col>
    </Row>
  ) : null
// This widget is just a wrapper of Input to add a button
const CaptchaInput = props => (
  <Row gutter={10}>
    <Col span={16}>
      <Input {...props} />{' '}
    </Col>
    <Col span={8}>
      <Button>Get Captcha</Button>{' '}
    </Col>
  </Row>
)
export default () => {
  const [form] = Form.useForm()
  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
  })
  const meta = [
    { key: 'product', label: 'Product' },
    {
      key: '_temp_price_currency',
      label: 'Price',
      // Set forwardRef to true if use functional component as field widget
      // to avoid warnings
      forwardRef: true,
      widget: PriceInput,
      initialValue: { price: 8, currency: 'USD' },
    },
    {
      key: 'captcha',
      label: 'Captcha',
      required: true,
      extra: 'We must make sure that your are a human.',
      forwardRef: true,
      widget: CaptchaInput,
    },
    {
      key: 'shipDate',
      label: 'Ship Date',
      readOnly: true,
      viewWidget: () => {
        return (
          <Row>
            <Col span={11}>
              <FormBuilder
                form={form}
                meta={{
                  key: 'startDate',
                  widget: 'date-picker',
                  widgetProps: { style: { width: '100%' } },
                  noStyle: true,
                }}
              />
            </Col>
            <Col span={2} style={{ textAlign: 'center' }}>
              -
            </Col>
            <Col span={11}>
              <FormBuilder
                form={form}
                meta={{
                  key: 'endDate',
                  widget: 'date-picker',
                  widgetProps: { style: { width: '100%' } },
                  noStyle: true,
                }}
              />
            </Col>
          </Row>
        )
      },
    },

    { key: 'note', label: 'Note' },
  ]

  return (
    <Form form={form} onFinish={handleFinish} style={{ width: '500px' }}>
      <FormBuilder meta={meta} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
