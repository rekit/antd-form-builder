import React from 'react'
import FormBuilder from './FormBuilder'
import { Input, Checkbox, Switch, Button, Select, InputNumber, Radio, DatePicker } from 'antd'
import _ from 'lodash'

const mapOptions = options => {
  if (!_.isArray(options)) {
    throw new Error('Options should be array in form builder meta.')
  }
  return options.map(opt => {
    let value
    let label
    if (_.isArray(opt)) {
      value = opt[0]
      label = opt[1]
    } else {
      value = opt
      label = opt
    }
    return { value, label }
  })
}

FormBuilder.defineWidget('checkbox', Checkbox, ele => {
  return { ...ele, valuePropName: 'checked' }
})

FormBuilder.defineWidget('switch', Switch, ele => {
  return { ...ele, valuePropName: 'checked' }
})

FormBuilder.defineWidget('button', Button)
FormBuilder.defineWidget('input', Input)
FormBuilder.defineWidget('password', Input.Password)
FormBuilder.defineWidget('textarea', Input.TextArea)
FormBuilder.defineWidget('number', InputNumber)
FormBuilder.defineWidget('date-picker', DatePicker)
FormBuilder.defineWidget('radio', Radio)
FormBuilder.defineWidget('radio-group', Radio.Group, ele => {
  const RadioComp = ele.buttonGroup ? Radio.Button : Radio
  if (ele.options && !ele.children) {
    return {
      ...ele,
      widgetProps: {
        ...ele.widgetProps,
        name: ele.key,
      },
      children: mapOptions(ele.options).map(opt => (
        <RadioComp value={opt.value} key={opt.value}>
          {opt.label}
        </RadioComp>
      )),
    }
  }
  return ele
})

FormBuilder.defineWidget('checkbox', Checkbox)
FormBuilder.defineWidget('checkbox-group', Checkbox.Group, ele => {
  if (ele.options && !ele.children) {
    return {
      ...ele,
      children: mapOptions(ele.options).map(opt => (
        <Checkbox value={opt.value} key={opt.value}>
          {opt.label}
        </Checkbox>
      )),
    }
  }
  return ele
})
FormBuilder.defineWidget('select', Select, ele => {
  if (ele.options && !ele.children) {
    return {
      ...ele,
      children: mapOptions(ele.options).map(opt => (
        <Select.Option value={opt.value} key={opt.value}>
          {opt.label}
        </Select.Option>
      )),
    }
  }
  return ele
})
