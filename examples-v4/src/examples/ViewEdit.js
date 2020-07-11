import React, { useCallback, useState } from 'react'
import { Form, Button, Modal } from 'antd'
import moment from 'moment'
import FormBuilder from 'antd-form-builder'

const MOCK_INFO = {
  name: { first: 'Nate', last: 'Wang' },
  email: 'myemail@gmail.com',
  gender: 'Male',
  dateOfBirth: moment('2100-01-01'),
  phone: '15988888888',
  city: 'Shanghai',
  address: 'No.1000 Some Road, Zhangjiang Park, Pudong New District',
}
const DateView = ({ value }) => value.format('MMM Do YYYY')
export default () => {
  const [form] = Form.useForm()
  const [viewMode, setViewMode] = useState(true)
  const [pending, setPending] = useState(false)
  const [personalInfo, setPersonalInfo] = useState(MOCK_INFO)
  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
    setPending(true)
    setTimeout(() => {
      setPending(false)
      setPersonalInfo(values)
      setViewMode(true)
      Modal.success({
        title: 'Success',
        content: 'Infomation updated.',
      })
    }, 1500)
  })
  const getMeta = () => {
    const meta = {
      columns: 2,
      disabled: pending,
      initialValues: personalInfo,
      fields: [
        { name: ['name', 'first'], label: 'First Name', required: true },
        { key: 'name.last', label: 'Last Name', required: true },
        { key: 'gender', label: 'Gender', widget: 'radio-group', options: ['Male', 'Female'] },
        {
          key: 'dateOfBirth',
          label: 'Date of Birth',
          widget: 'date-picker',
          viewWidget: DateView,
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address', colSpan: 2 },
        { key: 'city', label: 'City' },
        { key: 'zipCode', label: 'Zip Code' },
      ],
    }
    return meta
  }

  return (
    <div>
      <Form layout="horizontal" form={form} onFinish={handleFinish} style={{ width: '800px' }}>
        <h1 style={{ height: '40px', fontSize: '16px', marginTop: '50px', color: '#888' }}>
          Personal Infomation
          {viewMode && (
            <Button type="link" onClick={() => setViewMode(false)} style={{ float: 'right' }}>
              Edit
            </Button>
          )}
        </h1>
        <FormBuilder form={form} getMeta={getMeta} viewMode={viewMode} />
        {!viewMode && (
          <Form.Item className="form-footer" wrapperCol={{ span: 16, offset: 4 }}>
            <Button htmlType="submit" type="primary" disabled={pending}>
              {pending ? 'Updating...' : 'Update'}
            </Button>
            <Button
              onClick={() => {
                form.resetFields()
                setViewMode(true)
              }}
              style={{ marginLeft: '15px' }}
            >
              Cancel
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  )
}
