import React from 'react'
import { Select } from 'antd'
import useHash from './useHash'
import CodeViewer from './CodeViewer'
import Basic from './examples/Basic'
import DynamicFields from './examples/DynamicFields'
import AsyncDataSource from './examples/AsyncDataSource'
import MultipleColumns from './examples/MultipleColumns'
import ComplexLayout from './examples/ComplexLayout'
import MultipleFormBuilders from './examples/MultipleFormBuilders'
import SingleField from './examples/SingleField'
import Validation from './examples/Validation'
import Coordinated from './examples/Coordinated'
import FormInModal from './examples/FormInModal'
import CustomComponent from './examples/CustomComponent'
import ViewEdit from './examples/ViewEdit'
import Mixed from './examples/Mixed'
import Wizard from './examples/Wizard'
import Simple from './examples/Simple'
import ViewMode from './examples/ViewMode'

import './App.css'

const { Option } = Select
const examples = {
  simple: {
    name: 'Simple',
    component: Simple,
    description: 'The most simple usage.',
  },
  basic: { name: 'Basic', component: Basic, description: 'Basic usage.' },
  'view-mode': {
    name: 'View Mode',
    component: ViewMode,
    description:
      'FormBuilder could also be used as view mode just for displaying information in form layout. It could be used even without Form.',
  },
  'view-edit': {
    name: 'View / Edit',
    component: ViewEdit,
    description: 'FormBuilder makes it super easy to toggle view/edit mode of a form.',
  },
  'dynamic-fields': {
    name: 'Dynamic Fields',
    component: DynamicFields,
    description:
      "You can dynamically add or remove fields according to the user's input. In this example, if choose other, then a new input appears.",
  },

  'async-data-source': {
    name: 'Async Data Source',
    component: AsyncDataSource,
    description:
      'Some form field widgets may need to load data source if necessary, the sample shows how to do it',
  },
  'multiple-columns': {
    name: 'Multiple Columns',
    component: MultipleColumns,
    description:
      "It's easy to set multiple columns layout for the form. Note it should be able to divide 24",
  },
  'complex-layout': {
    name: 'Complex Layout',
    component: ComplexLayout,
    description: 'The example shows a complex layout. Similar approach with multiple columns.',
  },
  'multiple-form-builders': {
    name: 'Multiple Form Builders',
    component: MultipleFormBuilders,
    description:
      'Some times you need to group fields into different fieldset, or need more complex layout. You can use multiple form builders in one form.',
  },
  'single-field': {
    name: 'Single Field',
    component: SingleField,
    description:
      'You can use FormBuilder for even a single form field. This example also shows inline layout of the form.',
  },
  validation: {
    name: 'Validation',
    component: Validation,
    description: (
      <span>
        You can use rules property to specify how to validate fields. For more information please go
        to:{' '}
        <a
          href="https://ant.design/components/form/#Validation-Rules"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ant.design/components/form/#Validation-Rules
        </a>
      </span>
    ),
  },
  'form-in-modal': {
    name: 'Form in Modal',
    component: FormInModal,
    description:
      'The example shows how to use form in a dialog to call api and show status in dialog buttons.',
  },
  coordinated: {
    name: 'Coordinated Controls',
    component: Coordinated,
    description:
      'You can set field value according to input of another control by use form.setFieldsValue api.',
  },
  'custom-component': {
    name: 'Custom Component',
    component: CustomComponent,
    description:
      "It's easy to create your own form field component, ether to get new capabilities or even just for layout.",
  },
  mixed: {
    name: 'Mixed',
    component: Mixed,
    description:
      'Form builder is designed to not limit original antd form api, so you can use them together.',
  },
  wizard: {
    name: 'Wizard',
    component: Wizard,
    description:
      'Wizard is an advanced usage of form builder, you can design your own meta structure to support dynamic wizard.',
  },
}

export default () => {
  const current = useHash() || 'basic'

  const renderExample = () => {
    const item = examples[current]
    if (!item || !item.component) {
      return <span style={{ color: 'red' }}>Error: example "{current}" not found.</span>
    }
    const Comp = item.component
    return (
      <React.Fragment>
        <h1>
          {item.name}
          <p className="example-description">{item.description}</p>
        </h1>
        <Comp />
      </React.Fragment>
    )
  }

  const handleVersionChange = ver => {
    if (ver === 'v3.x') {
      document.location = '/antd-form-builder/examples-v3'
    }
  }

  return (
    <div className="app">
      <div className="sider">
        <h1>
          <span className="header-name">antd-form-builder</span>
          <span className="example-title">Examples</span>
          <Select defaultValue="v4.x" size="small" onChange={handleVersionChange}>
            <Option value="v4.x">Antd v4.x</Option>
            <Option value="v3.x">Antd v3.x</Option>
          </Select>
        </h1>
        <div className="scroll-container">
          <ul>
            {Object.keys(examples).map(key => (
              <li key={key}>
                <a href={`#${key}`} className={current === key ? 'active' : ''}>
                  {examples[key].name}
                </a>
              </li>
            ))}
          </ul>

          <div className="social">
            <a href="https://github.com/rekit/antd-form-builder">
              <img
                src="https://img.shields.io/github/stars/rekit/antd-form-builder?style=social"
                alt="Github Repo"
              />
            </a>
            <br />
            <a href="https://github.com/rekit/antd-form-builder">
              <img src="https://img.shields.io/badge/API-Reference-green" alt="api reference" />
            </a>
            <br />
            <a href="https://codesandbox.io/s/github/rekit/antd-form-builder/tree/master/examples-v4">
              <img
                width="150px"
                src="https://codesandbox.io/static/img/play-codesandbox.svg"
                alt="codesandbox"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="example-container">{renderExample()}</div>
      <div className="code-container">
        <CodeViewer code={current} />
      </div>
    </div>
  )
}
