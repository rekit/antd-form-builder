import React, { Component } from 'react'
import { Form, Button, Rate } from 'antd'
import FormBuilder from 'antd-form-builder'

export default class App extends Component {
  form = FormBuilder.createForm(this)
  handleFinish = evt => {
    console.log('submit: ', this.form.getFieldsValue())
  }

  render() {
    const options = ['Apple', 'Orange', 'Banana']
    const meta = {
      columns: 1,
      dynamicFields: '*',
      fields: [
        {
          key: 'obj.input',
          label: 'Input',
          required: true,
          tooltip: 'This is the tooltip.',
        },
        { key: 'checkbox', label: 'Checkbox', widget: 'checkbox', initialValue: true },
        { key: 'rating', label: 'Rating', widget: Rate, initialValue: 2 },
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

    console.log(this.form.getFieldValue('checkbox'))

    return (
      <Form
        form={this.form}
        layout="horizontal"
        onValuesChange={this.form.handleValuesChange}
        onFinish={this.handleFinish}
      >
        <FormBuilder meta={meta} form={this.form} />
        <Form.Item wrapperCol={{ span: 16, offset: 8 }} className="form-footer">
          <Button htmlType="submit" type="primary" onClick={() => this.forceUpdate()}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
