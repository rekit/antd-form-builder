# antd-form-builder

antd-form-builder is a small (< 300 lines source code) but powerful helper utility for building forms with ant.design for React. It not only helps to define form fields easily but also for fields layout.

[![NPM](https://img.shields.io/npm/v/antd-form-builder.svg)](https://www.npmjs.com/package/antd-form-builder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Examples
You can see the live demo at:
https://rekit.github.io/antd-form-builder

## Background
I've been using ant.design and this little helper utitlity since 3 years ago in more than 10 projects. Not only in Rekit Studio, Rekit App but also in internal projects of my company. It has been just working well. In the past, every project has a copy of this form builder since it's really small. But it became a problem when there was slight difference among projects and it lacks of documentation. So I decided to publish it as a npm module, write docs and create demos for it.

## Philosophy
The key principle in my mind to create antd-form-builder is it should just help to define form fields and the layout while it doesn't reduce the flexibility of antd's original form API. So in simple patterns you can create a form very easily but if a form is much complicated you can still use the original form API. You can even use antd-form-builder together with the raw API in a mixed way.

## Meta Driven
Besides the simplified API which helps to create form easily, antd-form-builder is also very useful if you have meta driven requirement. For example if your form structure needs to be configurable, the meta could be a pure JSON object which can be easily saved and managed separately.

## Install

```bash
npm install --save-dev antd-form-builder
```

## Usage
The most simple usage is like below:
```js
import React from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default Form.create()(({ form }) => {
  const meta = {
    fields: [
      { key: 'username', label: 'User Name' },
      { key: 'password', label: 'Password', widget: 'password' },
    ],
  }

  return (
    <Form>
      <FormBuilder meta={meta} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary">Login</Button>
      </Form.Item>
    </Form>
  )
})
```
To see more examples, please go to https://rekit.github.io/antd-form-builder

## Define Custom Widget
To define widget in a field, you can use either a string which maps to a widget or a react component directly.
```js
const meta = { key: 'name', label: 'Name', widget: 'input'}
// or
const meta = { key: 'name', label: 'Name', widget: Input }
```

To define your custom widget, you can use component directly for widget field. To use the string key, you can use the static method `FormBuilder.defineWidget` to define it.

```js
const MyComp = ({ value, onChange}) => {...}
FormBuilder.defineWidget('my-comp', MyComp)
```

Then you can use it:
```js
const meta = { key: 'comp', label: 'Comp', widget: 'my-comp' }
```
This mechanism not only makes it easy to define meta easily in your project, but also useful if you want your meta could be pure JSON object.

## API Reference

### FormBuilder
#### Props:
| Name  | Type | Description |
| --- | --- | --- |
| form | object | The antd form instance, unnecessary in viewMode |
| meta | object,array| The meta for building the form. See below docs for detailed usage |
| viewMode | bool | In view mode, FormBuild uses viewWidget property for a field, show value directly if viewWidget not defined. And labels are left aligned in the form. Default to false.|

#### FormBuilder.defineWidget(key, component, metaConvertor)
Define the key for a widget so that you can use string key in the meta like 'date-picker', 'select'. You can also provide a meta convertor to to provide easier way to give props to the widget.

##### `key`
string key to used for the widget

##### `component` : 
The react component to used in form field

##### `metaConvertor`
function, convert field meta to a new meta.

For example: to make it easier to define a `Select` widget for the field, FormBuilder uses below code internally:

```js
const mapOptions = options => {
  if (!_.isArray(options)) {
    throw new Error('Options should be array in FormBuilder meta.')
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

FormBuilder.defineWidget('select', Select, field => {
  if (field.options && !field.children) {
    return {
      ...field,
      children: mapOptions(field.options).map(opt => (
        <Select.Option value={opt.value} key={opt.value}>
          {opt.label}
        </Select.Option>
      )),
    }
  }
  return field
})
```

Then you can define options for select component with below meta:
```js
const meta = { key: 'select', label: 'Select', options: ['opt1', 'opt2']}
```
Here `options` property from meta is converted to `chilren` property to `Select` component. You can define options in two mode:
```js
[[value1, label1], [value2, label2]]
// or
[valueAndLabel1, valueAndLabel2]
```

Otherwise without metaConvertor, you have to define your meta like below:
```js
const meta = {
  key: 'select',
  label: 'Select',
  children: ['opt1', 'opt2'].map(key => <Option key={key}>{key}</Option>),
};
```

So if you define you own widget, you can give a metaConvertor to provide a convenient way to define field widget.

### meta
`meta` property tells FormBuilder about all information of form structure.
Its basic structure is like below:
```js
const meta = {
  columns: 2, // how many columns to layout fields
  fields: [], // which fields in form
};
```
If meta is an array, it will be used as `fields`:
```js
const realMeta = { fields: meta }
```
If meta is an object without `fields` property, it's treated as a single field meta, so it will be converted to:
```js
const realMeta = { fields: [meta] }
```

Properties are list below:
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| columns | number | 1 |How many columns of the form layout. |
| viewMode | bool | false | If in viewMode, will use viewWidget for field meta and labels are left aligned.|
| formItemLayout | object/array| [8, 16] | The `labelCol` and `wrapperCol` passed to Form.Item. If it's an array, will be converted to `{ labelCol: { span: arr[0] }, wrapperCol: { span: arr[1] }}`. If a filed has different layout, define it in its own meta. |
| disabled | bool | false | If true, all fields components will be given a `disabled` property. |
| initialValues | object | null | Set initialValues to the form, usually used in form which edit values or in viewMode. You can also set initialValue for each field. |
| fields | array | null | Fields definition for the form. See below info for how to define a field.|

### field meta
Field meta is used to define each field. Generally it includes three kinds of information for each field:
1. `props` passed to <Form.Item>
2. `options` passed to `form.getFieldDecorator(key, options)
3. Other information for the field.



## License

MIT © [supnate](https://github.com/supnate)
