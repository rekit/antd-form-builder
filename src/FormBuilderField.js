/* eslint react/prop-types: 0 */
import React, { forwardRef } from 'react'
import memoize from 'lodash/memoize'
import isArray from 'lodash/isArray'
import has from 'lodash/has'
import find from 'lodash/find'
import pick from 'lodash/pick'
import capitalize from 'lodash/capitalize'
import { Form, Tooltip, Input } from 'antd'
import QuestionIcon from './QuestionIcon'
const FormItem = Form.Item

const isV4 = !!Form.useForm

const getValue = (obj, namePath) => {
  const arr = typeof namePath === 'string' ? namePath.split('.') : namePath
  let current = obj

  for (let i = 0; i < arr.length; i += 1) {
    if (has(current, arr[i])) {
      current = current[arr[i]]
    } else {
      return undefined
    }
  }

  return current
}

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
  const { field, meta, form } = props

  const label = field.tooltip ? (
    <span>
      {field.label}
      <Tooltip title={field.tooltip}>
        {' '}
        <QuestionIcon />
      </Tooltip>
    </span>
  ) : (
    field.label
  )

  let formItemLayout =
    field.formItemLayout || (field.label ? getValue(meta, 'formItemLayout') || [8, 16] : null)
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
    ...(meta.formItemLayout !== null ? formItemLayout : {}),
    label,
    ...pick(field, [
      'help',
      'extra',
      'labelCol',
      'wrapperCol',
      'colon',
      'htmlFor',
      'noStyle',
      'validateStatus',
      'hasFeedback',
    ]),

    ...field.formItemProps,
    className: `${
      meta.viewMode ? 'ant-form-item-view-mode' + (isV4 ? ' ant-form-item-view-mode-v4' : '') : ''
    } ${field.className || (field.formItemProps && field.formItemProps.className)}`,
  }
  if (isV4) {
    if (field.key || field.name) {
      formItemProps.name = field.name || field.key.split('.')
    }
    Object.assign(formItemProps, {
      noStyle: field.noFormItem || field.noStyle,
      ...pick(field, ['shouldUpdate', 'dependencies']),
    })
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
    initialValue = getValue(initialValues, field.name || field.key)
  }

  // Handle field props
  const rules = [...(field.rules || [])]
  if (field.required) {
    rules.unshift({ required: true, message: field.message || field.requiredMessage || undefined })
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
  if (isV4) {
    Object.assign(formItemProps, fieldProps)
  }

  if (isFieldViewMode) {
    let viewEle = null
    const formValues = form ? (isV4 ? form.getFieldsValue(true) : form.getFieldsValue()) : {}
    let viewValue = has(formValues, field.key || field.name.join('.'))
      ? getValue(formValues, formItemProps.name || field.key)
      : initialValue
    if (field.renderView) {
      viewEle = field.renderView(viewValue, form, initialValues)
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
      if (typeof viewValue === 'boolean') viewEle = capitalize(String(viewValue))
      else if (viewValue === undefined) viewEle = 'N/A'
      else {
        viewEle = (
          <span className="antd-form-builder-string-content">{String(viewValue) || ''}</span>
        )
      }
    }

    // TODO: readOnly seems to be the same with viewMode in antd v4
    if (form && field.readOnly) {
      const ele = <span className="antd-form-builder-read-only-content">{viewEle}</span>
      return (
        <FormItem {...formItemProps}>
          {isV4 ? ele : form.getFieldDecorator(field.id || field.key, fieldProps)(ele)}
        </FormItem>
      )
    }
    delete formItemProps.name
    delete formItemProps.key
    return <FormItem {...formItemProps}>{viewEle}</FormItem>
  }

  // Handle widget props
  const wp = field.widgetProps || {}
  const widgetProps = {
    ...pick(field, ['placeholder', 'type', 'className', 'class', 'onChange']),
    disabled: field.disabled || meta.disabled || props.disabled,
    ...wp,
  }

  let FieldWidget = field.widget || Input

  if (field.forwardRef) {
    FieldWidget = getWrappedComponentWithForwardRef(FieldWidget)
  }
  const valueProps = {}
  const ele = (
    <FieldWidget {...widgetProps} {...valueProps}>
      {field.children || null}
    </FieldWidget>
  )
  const ele2 = isV4 ? ele : form.getFieldDecorator(field.id || field.key, fieldProps)(ele)

  if (isV4) {
    // antd v4 always has form item
    return <FormItem {...formItemProps}>{ele}</FormItem>
  }
  return field.noFormItem || field.noStyle ? ele2 : <FormItem {...formItemProps}>{ele2}</FormItem>
}

export default FormBuilderField
