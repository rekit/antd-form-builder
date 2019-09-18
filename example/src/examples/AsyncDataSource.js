import React, { useCallback, useState, useEffect } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

const MOCK_DATA = {
  China: ['Beijing', 'Shanghai', 'Nanjing'],
  USA: ['New York', 'San Jose', 'Washton'],
  France: ['Paris', 'Marseille', 'Cannes'],
}

// Mock fetch
const fetchProvinces = country => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_DATA[country]) resolve(MOCK_DATA[country])
      else reject(new Error('Not found'))
    }, 1500)
  })
}

export default Form.create()(({ form }) => {
  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault()
      console.log('Submit: ', form.getFieldsValue())
    },
    [form],
  )

  const [provinces, setProvinces] = useState({})
  const country = form.getFieldValue('country')
  useEffect(() => {
    if (country && !provinces[country]) {
      fetchProvinces(country).then(arr => {
        setProvinces(p => ({ ...p, [country]: arr }))
      })
    }
  }, [country, setProvinces, provinces])

  // If country selected but no provinces in store, then it's loading
  const loading = country && !provinces[country]
  const meta = {
    elements: [
      {
        key: 'country',
        label: 'Country',
        widget: 'select',
        options: ['China', 'USA', 'France'],
        placeholder: 'Select country...',
        widgetProps: {
          onChange: () => {
            // Clear province value when country is changed
            form.setFieldsValue({ province: undefined })
          },
        },
      },
      {
        key: 'province',
        label: 'Province',
        widget: 'select',
        options: country ? provinces[country] || [] : [],
        placeholder: loading ? 'Loading...' : 'Select province...',
        widgetProps: { loading },
        disabled: loading || !country,
      },
    ],
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
