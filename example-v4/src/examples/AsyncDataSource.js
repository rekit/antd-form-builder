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
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  // const forceUpdate = FormBuilder.useForceUpdate()
  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
  }, [])

  const [cities, setCities] = useState({})
  const country = form.getFieldValue('country')
  console.log('country: ', country)
  useEffect(() => {
    if (country && !cities[country]) {
      fetchCities(country).then(arr => {
        setCities(p => ({ ...p, [country]: arr }))
      })
    }
  }, [country, setCities, cities])

  // If country selected but no cities in store, then it's loading
  const loading = country && !cities[country]
  const meta = [
    {
      key: 'country',
      label: 'Country',
      widget: 'select',
      options: ['China', 'USA', 'France'],
      placeholder: 'Select country...',
      widgetProps: {
        onChange: () => {
          console.log('widget on change')
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

  return (
    <Form form={form} onValuesChange={forceUpdate} onFinish={handleFinish}>
      <FormBuilder meta={meta} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
