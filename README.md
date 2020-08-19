# antd-form-builder
The FormBuilder is a small helper (< 500 lines of source code) for building forms with [React](https://reactjs.org) and [ant.design](https://ant.design) easily while not preventing you from using the original antd form API. It can not only be used as editable form but also to display readonly information with form layout. It supports both antd v3 and v4 versions.

[![NPM](https://img.shields.io/npm/v/antd-form-builder.svg)](https://www.npmjs.com/package/antd-form-builder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[<img src="https://opencollective.com/rekit/tiers/backers.svg?avatarHeight=60"/>](https://opencollective.com/rekit)

## Examples
You can see the live demo at:
https://rekit.github.io/antd-form-builder

## Philosophy
The key principle in my mind to create antd-form-builder is it should just help to define form fields and the layout while it doesn't reduce the flexibility of antd's original form API. So in simple patterns you can create a form very easily but if a form is much complicated you can still use the original form API. You can even use antd-form-builder together with the raw API in a mixed way.

## Meta Driven
Besides the simplified API which helps to create form easily, the FormBuilder is also very useful if you have meta driven requirement. For example if your form structure needs to be configurable, the meta could be a pure JSON object which can be easily saved and managed separately.

## About the New Form API of Ant.Design v4
The new v4 version of ant.design has been released. The form component has been re-written so some API is not backward-compatible now. One of main reasons why antd re-wrote form is for performance improvment of large and complicated forms. But it also lost some flexibilty of creating dynamic forms. In v3, when any form field is changed, the component will be re-rendered because it's hign-order-component based. But in v4 whenever a field is changed the component in which antd form is used will never re-render. That means it's now impossible to create dynamic forms with such code:

```jsx
<Form>
  {form.getFieldValue('f1') === 'foo' && <Form.Item {...}/>}
</Form>
```

Instead, you will need similar code like below:
```jsx
<Form form={form}>
  <Form.Item label="Field1" name="f1">
    <Input />
  </Form.Item>
  <Form.Item shouldUpdate>
    {() =>
      form.getFieldValue("f1") === "foo" && (
        <Form.Item label="Field2" name="f2">
          <Input />
        </Form.Item>
      )
    }
  </Form.Item>
</Form>
```

Then when you type in 'foo' in the field1 the second field2 will appear.

IMO, this API design looks hacky because the nested form item here is meaningless but the outer one is just a wrapper. The new `shouldUpdate` property means when other fileds are changed the `Form.Item` will re-render.

The new API is much less flexible for dynamic forms because you have to put all dynamic logic in the render props. That also means you have to break components into small parts that update separately in render props.

So for the new form API of antd v4, the antd-form-builder can still save much time for building dynamic forms.

## New API for antd v4
Though the API of antd-form-builder is backward-compatible, the new form builder still increases the major version to 2.0 since there're some new API for antd v4. If you still use antd v3 you don't need to change any code after upgrading to form builder 2.0. If you use v4, below is the key difference.

### 1. For class components
You need to create a form instance by `FormBuilder.createForm()` and pass it to the antd's `Form`:
```jsx
import FormBuilder from 'antd-form-builder';

export default class App extends Component {
  formRef = React.createRef()
  render() {
    const meta = [{ key: 'name', label: 'Name' }]
    return (
      <Form ref={formRef} onValuesChange={() => this.forceUpdate()}>
        <FormBuilder meta={meta} form={this.formRef} />
      </Form>
    )
  }
}
```

### 2. For functional components
You need to create a form with the hook `Form.useForm()` and pass it to the antd's `Form`:
```jsx
import { Form } from 'antd';
import FormBuilder from 'antd-form-builder'

export default () => {
  const [form] = Form.useForm()
  const forceUpdate = FormBuilder.useForceUpdate();
  const meta = [{ key: 'name', label: 'Name' }]
  return (
    <Form form={form} onValuesChange={forceUpdate}>
      <FormBuilder meta={meta} form={form} />
    </Form>
  )
}
```

### 3. Pass `forceUpdate` to antd's `Form`'s `onValuesChange`
This is because in the v4 Form, when fields are changed, the component is not re-renderred. This "urgly" mechanism ensure the wrapper component is always re-renderred when fields change. The reason why it took a bit long time for the FormBuilder 2.0 is just I also think this API looks a bit stange but unitl now I've not found a better way. However you don't need to worry about using this API because it will not bring incompatabilty issue. However, if you don't need dynamic field capability, you don't need to do this. If you want to control the dynamic logic more flexible, you can use `shouldUpdate` with `Form.Item` yourself.

## Install

```bash
npm install --save-dev antd-form-builder
```

## Usage
The most simple usage is like below (for antd v4):
```js
import React from 'react'
import { Form, Button } from 'antd'
import FormBuilder from 'antd-form-builder'

export default () => {
  const [form] = FormBuilder.useForm()
  const meta = {
    fields: [
      { key: 'username', label: 'User Name' },
      { key: 'password', label: 'Password', widget: 'password' },
    ],
  }

  return (
    <Form form={form}>
      <FormBuilder meta={meta} form={form} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary">Login</Button>
      </Form.Item>
    </Form>
  )
}
```

Then you get a form:

<img style="border: 1px solid #eee" src="images/login.png?raw=true" width="500">

To see more examples, please go to https://rekit.github.io/antd-form-builder

> NOTE: if you use antd v3.x, you may see a warning about module not found: `rc-field-form/lib/useForm`. It's not a problem because it needs to dynamically detect if the current Form is v3 or v4. If you know a better way without warning, feel free to create a PR.

## API Reference
The FormBuilder could be used for both antd v3 and v4, but the API set has a little difference. They will be marked as <img src="images/v3only.png?raw=true" width="55"> and <img src="images/v4only.png?raw=true" width="55">.

### General API for antd v4
| Name  | Description |
| --- | --- |
| FormBuilder.useForceUpdate <img src="images/v4only.png?raw=true" width="55">| If you need dynamic form, that is meta is changed when fields value changed, you should manually trigger re-render by set `onValuesChange={forceUpdate}`. |


### FormBuilder
#### Props:
| Name  | Type | Description |
| --- | --- | --- |
| form | object | The antd form instance, unnecessary in viewMode |
| meta | object/array| The meta for building the form. See below docs for detailed usage |
| getMeta(form, props) | function | You can pass a function to get form meta rather than give meta object directly. This is new from v2.1.0. |
| viewMode | bool | In view mode, FormBuild uses viewWidget property for a field, show value directly if viewWidget not defined. And labels are left aligned in the form. Default to false.|

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

Properties are listed below:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| columns | number | 1 |How many columns of the form layout. |
| formItemLayout | object/array| [8, 16] | The `labelCol` and `wrapperCol` passed to Form.Item. If it's an array, will be converted to `{ labelCol: { span: arr[0] }, wrapperCol: { span: arr[1] }}`. If a filed has different layout, define it in its own meta. |
| viewMode | bool | In view mode, FormBuild uses viewWidget property for a field, show value directly if viewWidget not defined. And labels are left aligned in the form. Default to false.|
| disabled | bool | false | If true, all fields components will be given a `disabled` property. |
| initialValues | object | null | Set initialValues to the form, usually used in form which edit values or in viewMode. You can also set initialValue for each field. |
| fields | array | null | Fields definition for the form. See below info for how to define a field.|
| gutter | number | 0 | The gap between columns.|

### Field meta
Field meta is used to define each field. Each field meta is an object defined in `meta.fields`. It's a central place to combine parameters to FormBuilder itself, <Form.Item> and `getFieldDecorators`. All options are listed below:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | string | | Required. The field key. Could be nested like `user.name.last`. It's just the key value passed to `getFieldDecorator(key, options)` |
| name <img src="images/v4only.png?raw=true" width="55"> | string/array | | Alternative of `key`. In form v4, if you need nested property for colleced form values like : `{ name: { first, last } }` you can define an array for the `name` property: `['name', 'first']`. If you prefer `name.first`, use `key` to define it. |
| label| string | | Label text.|
| viewMode | bool | false | Whether the field is in view mode. Note if a field is in viewMode but FormBuilder is not, the label in the field is still right aligned. |
| readOnly | bool | false | Whether the field is readOnly. The difference compared to `viewMode` is a read-only field is managed by form that is the value is collected when use `form.getFieldsValue`, but `viewMode` is not. It is also validated if some rules are configured for the field. |
| tooltip | string/React Node | | If set, there is a question mark icon besides label to show the tooltip. |
| widget | string/Component | Input | Which component used to render field for editing. The component should be able to be managed by antd form. |
| widgetProps | object | | Props passed to widget. |
| viewWidget | string/Component | text | Which component used to render field in view mode. |
| viewWidgetProps | object | | Props passed to viewWidget |
| formItemLayout | object/array| [8, 16] | This applies formItemLayout only to this field rather than which defined in the root meta. |
| render | function | | If provided, this is used for rendering the whole field in both edit and view mode, should render <Form.Item>, `getFieldDecorator` itself. `widget` property will be ignored. |
| renderView | function | | If provided, this is used for rendering field value in view mode, `viewWidget` will be ignored. |
| colSpan | number | 1 | How many columns the field should take up. |
| initialValue | any | | The initialValue to be passed to the field widget. In view mode, it's the value to be display. |
| getInitialValue | func(field, initialValues, form) | | Get the `initialValue` of the field. This may be used to combine multiple fields into one field |
| disabled | bool | false | If set to true, every widget in field will be given a `disabled` property regardless of if it's supported. |
| clear | enum | | In multiple columns layout, used to clear left, right or both side fields. Like the `clear` property in css. Could be `left`: the field starts from a new row; `right`: no fields behind the field; `both`: no other fields in the same row. |
| forwardRef | bool | | If your field widget is a funcional component which doesn't implement forwardRef, set this to true so that React doesn't prompt warning message. |
| noFormItem | bool | false | By default, each field is wrapped with <Form.Item>, if set to true, it just use getFieldDecorators. |
| noStyle | bool | false | The same with old `noFormItem`. Provlide the alias `noStyle` to be consitent with antd v4. |
| children | ReactNode | | The `children` of widget defined in meta.  |
| required | bool | false | Whether the field is required. |
| message | string | | If a field is required, you can define what message provided if no input. By default, it's `${field.label} is required.`|
| options | array | | Only used by select, radio-group. checkbox-group components, explained below. |
| **[formItemProps](https://ant.design/components/form/#Form.Item)** | **object** |  | **The props passed to <Form.Item>. Below properties are short way to pass props to <Form.Item>. [See more from antd's doc](https://ant.design/components/form/#Form.Item)** |
| colon| bool| true |Used with `label`, whether to display : after label text. |
| extra| string/ReactNode | | The extra prompt message. It is similar to help. Usage example: to display error message and prompt message at the same time. |
| hasFeedback | bool | false |Used with `validateStatus`, this option specifies the validation status icon. Recommended to be used only with `Input`. |
| help| string/ReactNode | |The prompt message. If not provided, the prompt message will be generated by the validation rule. |
| htmlFor| string  | | Set sub label `htmlFor`.|
| labelCol| object | | The layout of label. You can set `span` `offset` to something like `{span: 3, offset: 12}` or `sm: {span: 3, offset: 12}` same as with `<Col>`. |
| validateStatus| string | | The validation status. If not provided, it will be generated by validation rule. options: 'success' 'warning' 'error' 'validating' |
| wrapperCol| object | |The layout for input controls, same as `labelCol`. |
| **[fieldProps](https://ant.design/components/form/#getFieldDecorator(id,-options)-parameters)** | **object** |  | **The options to pass to `getFieldDecorator(id, options)`. Below properties are short way to pass `options` to `getFieldDecorator(id, options)`. [See more from antd's doc](https://ant.design/components/form/#getFieldDecorator(id,-options)-parameters)** |
| getValueFromEvent | function(..args) | | Specify how to get value from event or other onChange arguments|
| getValueProps | function(value) | | Get the component props according to field value. |
| normalize |function(value, prevValue, allValues) | | Normalize value to form component |
| preserve <img src="images/v3only.png?raw=true" width="55">| bool | false |Keep the field even if field removed. |
| rules |object[] | | Includes validation rules. Please refer to "Validation Rules" part for details.|
| trigger | string | 'onChange'|When to collect the value of children node |
| validateFirst | bool | false | Whether stop validate on first rule of error for this field. |
| validateTrigger | string / string[]| 'onChange' |When to validate the value of children node. |
| valuePropName | string| |Props of children node, for example, the prop of Switch is 'checked'. |

## Use String Key to Define a Widget
To define the widget for a field, you can use either a string which maps to a widget or a react component directly.
```js
const meta = { key: 'name', label: 'Name', widget: 'input'}
// or
const meta = { key: 'name', label: 'Name', widget: Input }
```

The reason why you can use a string for widget property is because there are some key-component mapping pre-defined in `antd-form-builder/defineAntdWidget.js`. Normally you can use a component for widget/viewWidget property of a field meta, but sometimes it's more convenient to use string so that you don't need to import the component while defining meta. And it's especially useful if you want to save meta in some config json.

The predefined components are listed below:

| key | Component | meta convention |
| --- | --- | --- |
| input | Input | |
| password | Input.Password | |
| textarea | Input.TextArea | |
| number | InputNumber | |
| select | Select | Typically you need to provide `children` property for Option array to the field meta metioned above. To make it easy to use, you can provide an `options` array to the field meta, internally it will be convented to `children` property. Explained below. |
| date-picker | DatePicker | |
| radio | Radio | |
| checkbox | CheckBox | |
| checkbox-group | CheckBox.Group | Use `options` for children, same as `select`. |
| switch | Switch | |
| radio-group | Radio.Group | Use `options` for children, same as `select`. Also you can set `buttonGroup` to true for tab button style instead of radio style.  |
| button | Button | |

### `options`
`options` is a special field meta just mentioned. It's only used for `select`, `checkbox-group` or `radio-group`. You can define children by options in 3 formats:

1. `[opt1, opt2, opt3, ...]`, here value and label are same as opt1, opt2, opt3....

2. `[[value1, label1], [value2, label2], ...]`

3. `[{value: 'v1', label: 'label1'}, {value: 'v2', label: 'label2'}, ...]`

## Extend FormBuilder: Define Keys for Your Components

Besides built-in pre-defined components, you can define your own by  `FormBuilder.defineWidget` static method like below:

```js
const MyComp = ({ value, onChange}) => {...}
FormBuilder.defineWidget('my-comp', MyComp)
```

Then you can use it:
```js
const meta = { key: 'comp', label: 'Comp', widget: 'my-comp' }
```

This mechanism not only makes it easy to define meta easily in your project, but also useful if you want your meta could be pure JSON object.

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
    throw new Error('Options should be array in form builder meta.')
  }
  return options.map(opt => {
    if (_.isArray(opt)) {
      return { value: opt[0], label: opt[1] }
    } else if (_.isPlainObject(opt)) {
      return opt
    } else {
      return { value: opt, label: opt }
    }
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

## Contribute
### Local development
This project is bootstraped by [create-react-library](https://github.com/transitive-bullshit/create-react-library). To start development locally, follow below steps:

```sh
# 1. Clone repo
git clone https://github.com/rekit/antd-form-builder.git

# 2. Install dependencies
cd antd-form-builder
npm install

# 3. Run rollup in watch mode
npm start

# 4. Start example dev server (in anther tab)
cd example
npm start
```

Now, anytime you make a change to your library in src/ or to the example app's example/src, create-react-app will live-reload your local dev server so you can iterate on your component in real-time.

### Build examples
```sh
cd examples
npm run build
```
This will build examples into root `docs` folder which is used as gh-pages root. So after build, commit or pr the changes to the repo.

## License

MIT © [supnate](https://github.com/supnate)
