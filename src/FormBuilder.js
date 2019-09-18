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

function convertElement(element) {
  const widget = getWidget(element.widget)
  const item = _.find(
    Object.values(widgetMap),
    entry => entry.widget === widget && entry.metaConvertor,
  )
  if (item) {
    const newElement = item.metaConvertor(element)
    if (!newElement) {
      throw new Error(`metaConvertor of '${String(element.widget)}' must return a new element`)
    }
    return newElement
  }
  return element
}

class FormBuilder extends Component {
  static propTypes = {
    meta: PropTypes.object.isRequired,
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
    // To support single element form builder
    const { meta } = this.props
    return meta.elements ? meta : { elements: [meta] }
  }

  renderElement = element => {
    const meta = this.getMeta()
    element = convertElement(element)
    // Handle form item props
    const label = element.tooltip ? (
      <span>
        {element.label}
        <Tooltip title={element.tooltip}>
          {' '}
          <Icon type="question-circle-o" />
        </Tooltip>
      </span>
    ) : (
      element.label
    )

    let formItemLayout =
      element.formItemLayout ||
      meta.formItemLayout ||
      (element.label ? defaultFormItemLayout : null)
    if (_.isArray(formItemLayout)) {
      formItemLayout = {
        labelCol: { span: formItemLayout[0] },
        wrapperCol: { span: formItemLayout[1] },
      }
    }

    const formItemProps = {
      key: element.key,
      colon: meta.colon,
      ...formItemLayout,
      label,
      className: element.readonly ? 'antd-form-builder-item-readonly' : null,
      ..._.pick(element, [
        'help',
        'extra',
        'labelCol',
        'wrapperCol',
        'colon',
        'validateStatus',
        'hasFeedback',
      ]),
      ...element.formItemProps,
    }

    if (element.colSpan && formItemProps.labelCol) {
      const labelCol = formItemProps.labelCol.span / element.colSpan

      Object.assign(formItemProps, {
        labelCol: { span: labelCol },
        wrapperCol: { span: 24 - labelCol },
      })
    }

    if (element.render) {
      return element.render.call(this, {
        formItemProps,
        element,
        ..._.pick(this.props, ['form', 'disabled', 'viewMode', 'values']),
      })
    }

    const ElementWidget = getWidget(element.widget) || Input
    let initialValue
    if (_.has(element, 'initialValue')) {
      initialValue = element.initialValue
    } else if (element.getInitialValue) {
      initialValue = element.getInitialValue(element, this.props.values, this.props.form)
    } else {
      initialValue = _.get(this.props.values, element.key) || undefined
    }

    if (this.props.viewMode || element.readOnly) {
      let viewEle = null
      if (element.viewWidget) {
        const ViewWidget =
          typeof element.viewWidget === 'string'
            ? getWidget(element.viewWidget)
            : element.viewWidget
        viewEle = <ViewWidget value={initialValue} {...element.viewWidgetProps} element={element} />
      } else if (element.link) {
        const href = typeof element.link === 'string' ? element.link : initialValue
        viewEle = (
          <a href={href} target={element.linkTarget || '_self'}>
            {initialValue}
          </a>
        )
      } else if (element.options) {
        // a little hacky here, if a field is select/options like, auto use label for value
        const found = _.find(element.options, opt => opt[0] === initialValue)
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
    const rules = [...(element.rules || [])]
    if (element.required) {
      rules.unshift({
        required: true,
        message: element.message || `${element.label || element.key} is required.`, // default to English, if needs localization, define it in fieldProps.rules.
      })
    }
    const fieldProps = {
      validateFirst: true,
      initialValue,
      ..._.pick(element, [
        'getValueFromEvent',
        'normalize',
        'trigger',
        'valuePropName',
        'validateTrigger',
        'validateFirst',
      ]),
      rules,
      ...element.fieldProps,
    }

    // Handle widget props
    const wp = element.widgetProps || {}
    const widgetProps = {
      ..._.pick(element, ['placeholder', 'type', 'className', 'class']),
      disabled: element.disabled || this.props.disabled,
      ...wp,
    }
    const { getFieldDecorator } = this.props.form

    return (
      <FormItem {...formItemProps}>
        {getFieldDecorator(element.id || element.key, fieldProps)(
          <ElementWidget {...widgetProps}>{element.children || null}</ElementWidget>,
        )}
      </FormItem>
    )
  }

  renderLayout(elements, rawElements) {
    // Layout the form in columns
    const columns = this.props.meta.columns || 1
    if (columns === 1) {
      return elements
    }
    const rowClassName = `antd-form-builder-row ${
      this.props.viewMode ? 'antd-form-builder-row-view-mode' : ''
    }`

    const gutter = this.props.meta.gutter || 10
    const rows = []
    // for each column , how many grid cols
    const colspan = 24 / columns
    // eslint-disable-next-line
    for (let i = 0; i < elements.length; ) {
      const cols = []
      let eleSpan = rawElements[i].colSpan || 1

      for (
        let j = 0;
        (j + eleSpan <= columns || cols.length === 0) && i < elements.length;
        j += eleSpan
      ) {
        eleSpan = rawElements[i].colSpan || 1
        cols.push(
          <Col key={j} span={Math.min(24, colspan * eleSpan)}>
            {elements[i]}
          </Col>,
        )
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
    return (
      <div className="antd-form-builder">
        {this.renderLayout(meta.elements.map(this.renderElement), meta.elements)}
      </div>
    )
  }
}

FormBuilder.defineWidget = (name, widget, metaConvertor = null) => {
  widgetMap[name] = {
    widget,
    metaConvertor,
  }
}

export default FormBuilder
