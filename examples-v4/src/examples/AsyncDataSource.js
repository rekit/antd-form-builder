import React, { useCallback, useState, useEffect } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

const MOCK_DATA = {
  China: ['Beijing', 'Shanghai', 'Nanjing'],
  USA: ['New York', 'San Jose', 'Washton'],
  France: ['Paris', 'Marseille', 'Cannes'],
}

// Mock fetch
const fetchCities = country => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_DATA[country]) resolve(MOCK_DATA[country])
      else reject(new Error('Not found'))
    }, 1500)
  })
}

export default () => {
  const [form] = Form.useForm()
  const [cities, setCities] = useState({})
  const forceUpdate = FormBuilder.useForceUpdate()
  const country = form.getFieldValue('country')
  const loading = country && !cities[country]

  const meta = [
    {
      key: 'country',
      label: 'Country',
      widget: 'select',
      options: ['China', 'USA', 'France'],
      placeholder: 'Select country...',
      initialValue: 'China',
      dynamic: true,
      widgetProps: {
        onChange: () => {
          // Clear city value when country is changed
          form.setFieldsValue({ city: undefined })
        },
      },
    },
    {
      key: 'city',
      label: 'City',
      widget: 'select',
      options: country ? cities[country] || [] : [],
      placeholder: loading ? 'Loading...' : 'Select city...',
      widgetProps: { loading },
      disabled: loading || !country,
    },
  ]

  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
  }, [])

  useEffect(() => {
    if (country && !cities[country]) {
      fetchCities(country).then(arr => {
        setCities(p => ({ ...p, [country]: arr }))
      })
    }
  }, [country, setCities, cities])

  // If country selected but no cities in store, then it's loading
  return (
    <Form form={form} onFinish={handleFinish} onValuesChange={forceUpdate}>
      <FormBuilder meta={meta} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
