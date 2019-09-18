import React, { Component } from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export class App extends Component {
  handleSubmit = evt => {
    evt.preventDefault()
    console.log('submit: ', this.props.form.getFieldsValue())
  }
  render() {
    const options = ['Apple', 'Orange', 'Banana']
    const meta = {
      columns: 1,
      elements: [
        { key: 'input', label: 'Input', required: true, tooltip: 'This is the name.' },
        { key: 'checkbox', label: 'Checkbox', widget: 'checkbox', initialValue: true },
        { key: 'switch', label: 'Switch', widget: 'switch', initialValue: true },
        { key: 'select', label: 'Select', widget: 'select', options },
        { key: 'checkbox-group', label: 'Checkbox Group', widget: 'checkbox-group', options },
        { key: 'radio-group', label: 'Radio Group', widget: 'radio-group', options },
        {
          key: 'radio-button-group',
          label: 'Radio Button Group',
          widget: 'radio-group',
          buttonGroup: true,
          options,
        },
        { key: 'password', label: 'Password', widget: 'password' },
        { key: 'textarea', label: 'Textarea', widget: 'textarea' },
        { key: 'number', label: 'Number', widget: 'number' },
        { key: 'date-picker', label: 'Date Picker', widget: 'date-picker' },
      ],
    }
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormBuilder form={this.props.form} meta={meta} />
        <Form.Item wrapperCol={{ span: 16, offset: 8 }} className="form-footer">
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(App)
