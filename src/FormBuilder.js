/* eslint react/no-multi-comp: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Col, Form, Icon, Row, Tooltip, Input } from 'antd'

const FormItem = Form.Item
const widgetMap = {}
const defaultFormItemLayout = [8, 16]

function getWidget(widget) {
  if (typeof widget === 'string') {
    if (!widgetMap[widget] || !widgetMap[widget].widget) {
      throw new Error(
        `Widget '${widget}' not found, did you defined it by FormBuilder.defineComponent?`,
      )
    }
    return widgetMap[widget].widget
  }
  return widget
}

function convertMeta(field) {
  const widget = getWidget(field.widget)
  const item = _.find(
    Object.values(widgetMap),
    entry => entry.widget === widget && entry.metaConvertor,
  )
  if (item) {
    const newField = item.metaConvertor(field)
    if (!newField) {
      throw new Error(`metaConvertor of '${String(field.widget)}' must return a new field`)
    }
    return newField
  }
  return field
}

class FormBuilder extends Component {
  static propTypes = {
    meta: PropTypes.any.isRequired,
    values: PropTypes.object,
    form: PropTypes.object,
    disabled: PropTypes.bool,
    viewMode: PropTypes.bool, // if viewMode, labels are left aligned
  }

  static defaultProps = {
    disabled: false,
    form: null,
    viewMode: false,
    values: {},
  }

  getMeta() {
    // To support single field form builder
    const { meta } = this.props
    if (_.isArray(meta)) {
      return { fields: meta }
    } else if (meta.elements) {
      // Compatible with old version of form builder.
      return { ...meta, fields: meta.elements }
    } else if (!meta.fields) {
      return { fields: [meta] }
    }
    return meta
  }

  renderField = field => {
    const meta = this.getMeta()
    field = convertMeta(field)
    // Handle form item props
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
      field.formItemLayout || meta.formItemLayout || (field.label ? defaultFormItemLayout : null)
    if (_.isArray(formItemLayout)) {
      formItemLayout = {
        labelCol: { span: formItemLayout[0] },
        wrapperCol: { span: formItemLayout[1] },
      }
    }

    const formItemProps = {
      key: field.key,
      colon: meta.colon,
      ...formItemLayout,
      label,
      className: field.readonly ? 'antd-form-builder-item-readonly' : null,
      ..._.pick(field, [
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
    }

    if (field.colSpan && formItemProps.labelCol) {
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
        ..._.pick(this.props, ['form', 'disabled', 'viewMode', 'values']),
      })
    }

    const FieldWidget = getWidget(field.widget) || Input
    let initialValue
    if (_.has(field, 'initialValue')) {
      initialValue = field.initialValue
    } else if (field.getInitialValue) {
      initialValue = field.getInitialValue(field, this.props.values, this.props.form)
    } else {
      initialValue = _.get(this.props.values, field.key) || undefined
    }

    if (this.props.viewMode || field.readOnly) {
      let viewEle = null
      if (field.viewWidget) {
        const ViewWidget =
          typeof field.viewWidget === 'string' ? getWidget(field.viewWidget) : field.viewWidget
        viewEle = <ViewWidget value={initialValue} {...field.viewWidgetProps} field={field} />
      } else if (field.link) {
        const href = typeof field.link === 'string' ? field.link : initialValue
        viewEle = (
          <a href={href} target={field.linkTarget || '_self'}>
            {initialValue}
          </a>
        )
      } else if (field.options) {
        // a little hacky here, if a field is select/options like, auto use label for value
        const found = _.find(field.options, opt => opt[0] === initialValue)
        if (found) {
          initialValue = found[1]
        }
      }
      if (!viewEle) {
        if (typeof initialValue === 'boolean') viewEle = _.capitalize(String(initialValue))
        else if (initialValue === undefined) viewEle = 'N/A'
        else viewEle = String(initialValue) || ''
      }
      return (
        <FormItem {...formItemProps}>
          <span className="antd-form-builder-read-only-view">{viewEle}</span>
        </FormItem>
      )
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
      validateFirst: true,
      initialValue,
      ..._.pick(field, [
        'getValueFromEvent',
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

    // Handle widget props
    const wp = field.widgetProps || {}
    const widgetProps = {
      ..._.pick(field, ['placeholder', 'type', 'className', 'class', 'onChange']),
      disabled: field.disabled || meta.disabled || this.props.disabled,
      ...wp,
    }
    const { getFieldDecorator } = this.props.form

    return (
      <FormItem {...formItemProps}>
        {getFieldDecorator(field.id || field.key, fieldProps)(
          <FieldWidget {...widgetProps}>{field.children || null}</FieldWidget>,
        )}
      </FormItem>
    )
  }

  renderLayout(elements, fields) {
    // Layout the form in columns
    const columns = this.props.meta.columns || 1
    if (columns === 1) {
      return elements
    }
    const rowClassName = `antd-form-builder-row ${
      this.props.viewMode ? 'antd-form-builder-row-view-mode' : ''
    }`

    const meta = this.getMeta()
    const gutter = _.has(meta, 'gutter') ? meta.gutter : 10
    const rows = []
    // for each column , how many grid cols
    const spanUnit = 24 / columns
    // eslint-disable-next-line
    for (let i = 0; i < elements.length; ) {
      const cols = []
      for (
        let j = 0;
        (j < columns || j === 0) && // total col span is less than columns
        i < elements.length && // element exist
        (!['left', 'both'].includes(fields[i].clear) || j === 0); // field doesn't need to start a new row

      ) {
        const fieldSpan = fields[i].colSpan || 1
        cols.push(
          <Col key={j} span={Math.min(24, spanUnit * fieldSpan)}>
            {elements[i]}
          </Col>,
        )
        j += fieldSpan
        if (['both', 'right'].includes(fields[i].clear)) {
          i += 1
          break
        }
        i += 1
      }
      rows.push(
        <Row key={i} gutter={gutter} className={rowClassName}>
          {cols}
        </Row>,
      )
    }
    return rows
  }

  render() {
    const meta = this.getMeta()
    return this.renderLayout(meta.fields.map(this.renderField), meta.fields)
  }
}

FormBuilder.defineWidget = (name, widget, metaConvertor = null) => {
  widgetMap[name] = {
    widget,
    metaConvertor,
  }
}

export default FormBuilder
