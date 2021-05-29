import React from 'react'
import moment from 'moment'
import FormBuilder from 'antd-form-builder'

const DateView = ({ value }) => value.format('MMM Do YYYY')

export default () => {
  const personalInfo = {
    name: { first: 'Nate', last: 'Wang' },
    email: 'myemail@gmail.com',
    gender: 'Male',
    dateOfBirth: moment('2100-01-01'),
    phone: '15988888888',
    city: 'Shanghai',
    address: 'No.1000 Some Road, Zhangjiang Park, Pudong New District',
  }

  const meta = {
    columns: 2,
    fields: [
      { key: 'name.first', label: 'First Name' },
      { key: 'name.last', label: 'Last Name' },
      { key: 'gender', label: 'Gender' },
      {
        key: 'dateOfBirth',
        label: 'Date of Birth',
        viewWidget: DateView,
      },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'address', label: 'Address', colSpan: 2 },
      { key: 'city', label: 'City' },
      { key: 'zipCode', label: 'Zip Code' },
    ],
  }

  return (
    <div>
      <div style={{ width: '800px' }}>
        <h1>Personal Infomation</h1>
        <FormBuilder meta={meta} initialValues={personalInfo} viewMode />
      </div>
    </div>
  )
}
