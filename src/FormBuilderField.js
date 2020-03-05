/* eslint react/prop-types: 0 */
import React, { forwardRef } from 'react'
import memoize from 'lodash/memoize'
import isArray from 'lodash/isArray'
import get from 'lodash/get'
import has from 'lodash/has'
import find from 'lodash/find'
import pick from 'lodash/pick'
import { Form, Tooltip, Input } from 'antd'
const FormItem = Form.Item

const isV4 = !!Form.useForm
const useForm =
  Form.useForm ||
  (props => {
    // const [form] = useState(props.form)
    return props.form
  })

const Icon = () => '?'
const getWrappedComponentWithForwardRef = memoize(Comp =>
  forwardRef((props, ref) => {
    return (
      <span ref={ref}>
        <Comp {...props} />
      </span>
    )
  }),
)

function FormBuilderField(props) {
  const { field, meta } = props
  const form = useForm(props)
  const label = field.tooltip ? (
    <span>
      {field.label}
      <Tooltip title={field.tooltip}>
        {' '}
        <Icon type="question-circle-o" />
      </Tooltip>
    </span>
  ) : (
    field.label
  )

  let formItemLayout =
    field.formItemLayout || (field.label ? get(meta, 'formItemLayout') || [8, 16] : null)
  if (isArray(formItemLayout) && formItemLayout.length >= 2) {
    formItemLayout = {
      labelCol: { span: formItemLayout[0] },
      wrapperCol: { span: formItemLayout[1] },
    }
  }
  const isFieldViewMode = meta.viewMode || field.viewMode || field.readOnly
  const formItemProps = {
    key: field.key,
    colon: meta.colon,
    ...formItemLayout,
    label,
    ...pick(field, [
      'help',
      'extra',
      'labelCol',
      'wrapperCol',
      'colon',
      'htmlFor',
      'validateStatus',
      'hasFeedback',
    ]),
    ...field.formItemProps,
    className: `${meta.viewMode ? 'ant-form-item-view-mode' : ''} ${(field.formItemProps || {})
      .className || ''}`,
  }
  if (field.label && typeof field.label === 'string') {
    formItemProps['data-label'] = field.label // help e2e test
  }
  if (field.colSpan && formItemProps.labelCol && !field.formItemLayout) {
    const labelCol = Math.round(formItemProps.labelCol.span / field.colSpan)
    Object.assign(formItemProps, {
      labelCol: { span: labelCol },
      wrapperCol: { span: 24 - labelCol },
    })
  }

  if (field.render) {
    return field.render.call(this, {
      formItemProps,
      field,
      form,
      ...pick(props, ['disabled', 'viewMode', 'initialValues']),
    })
  }

  let initialValue
  const initialValues = meta.initialValues || {}
  if (has(field, 'initialValue')) {
    initialValue = field.initialValue
  } else if (field.getInitialValue) {
    initialValue = field.getInitialValue(field, initialValues, form)
  } else {
    initialValue = get(initialValues, field.key) || undefined
  }

  // Handle field props
  const rules = [...(field.rules || [])]
  if (field.required) {
    rules.unshift({
      required: true,
      message: field.message || `${field.label || field.key} is required.`, // default to English, if needs localization, define it in fieldProps.rules.
    })
  }
  const fieldProps = {
    initialValue,
    preserve: meta.preserve,
    ...pick(field, [
      'getValueFromEvent',
      'getValueProps',
      'normalize',
      'trigger',
      'preserve',
      'valuePropName',
      'validateTrigger',
      'validateFirst',
    ]),
    rules,
    ...field.fieldProps,
  }
  if (isFieldViewMode) {
    let viewEle = null
    const formValues = form ? form.getFieldsValue() : {}
    let viewValue = has(formValues, field.key) ? get(formValues, field.key) : initialValue
    if (field.renderView) {
      viewEle = field.renderView(viewValue, form)
    } else if (field.viewWidget) {
      const ViewWidget = field.viewWidget
      viewEle = (
        <ViewWidget value={viewValue} form={form} field={field} {...field.viewWidgetProps} />
      )
    } else if (field.link) {
      const href = typeof field.link === 'string' ? field.link : viewValue
      viewEle = (
        <a href={href} target={field.linkTarget || '_self'}>
          {viewValue}
        </a>
      )
    } else if (field.options) {
      // a little hacky here, if a field is select/options like, auto use label for value
      const found = find(field.options, opt => opt[0] === viewValue)
      if (found) {
        viewValue = found[1]
      }
    }
    if (!viewEle) {
      if (typeof viewValue === 'boolean') viewEle = _.capitalize(String(viewValue))
      else if (viewValue === undefined) viewEle = 'N/A'
      else {
        viewEle = (
          <span className="antd-form-builder-string-content">{String(viewValue) || ''}</span>
        )
      }
    }

    if (form && field.readOnly) {
      const ele = <span className="antd-form-builder-read-only-content">{viewEle}</span>
      return (
        <FormItem {...formItemProps}>
          {isV4 ? ele : form.getFieldDecorator(field.id || field.key, fieldProps)(ele)}
        </FormItem>
      )
    }
    return <FormItem {...formItemProps}>{viewEle}</FormItem>
  }
  // Handle widget props
  const wp = field.widgetProps || {}
  const widgetProps = {
    ...pick(field, ['placeholder', 'type', 'className', 'class', 'onChange']),
    disabled: field.disabled || meta.disabled || props.disabled,
    ...wp,
  }
  // const { getFieldDecorator } = form
  let FieldWidget = field.widget || Input

  if (field.forwardRef) {
    FieldWidget = getWrappedComponentWithForwardRef(FieldWidget)
  }
  const ele = <FieldWidget {...widgetProps}>{field.children || null}</FieldWidget>
  const ele2 = isV4 ? ele : form.getFieldDecorator(field.id || field.key, fieldProps)(ele)

  return field.noFormItem ? ele2 : <FormItem {...formItemProps}>{ele2}</FormItem>
}

export default FormBuilderField
