import React from 'react'
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

import './App.css'

const examples = {
  basic: { name: 'Basic', component: Basic, description: 'Basic form usage.' },
  'view-mode': { name: 'View Mode', component: ComplexLayout },
  'dynamic-fields': {
    name: 'Dynamic Fields',
    component: DynamicFields,
    description:
      "You can dynamically add or remove fields according to the user's input. In this example, if choose other, then a new input appears.",
  },
  'async-data-source': { name: 'Async Data Source', component: AsyncDataSource },
  'multiple-columns': { name: 'Multiple Columns', component: MultipleColumns },
  'complex-layout': { name: 'Complex Layout', component: ComplexLayout },
  'multiple-form-builders': {
    name: 'Multiple Form Builders',
    component: MultipleFormBuilders,
    description:
      'Some times you need to group fields into different fieldsets, or need more complex layout. You can use multiple form builders in one form.',
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
        <a href="https://ant.design/components/form/#Validation-Rules" target="_blank">
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
  mixed: { name: 'Mixed', component: Basic },
  wizard: { name: 'Wizard', component: Basic },
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

  return (
    <div className="app">
      <div className="sider">
        <h1>antd-form-builder</h1>

        <ul>
          {Object.keys(examples).map(key => (
            <li key={key}>
              <a href={`#${key}`} className={current === key ? 'active' : ''}>
                {examples[key].name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="example-container">{renderExample()}</div>
      <div className="code-container">
        <CodeViewer code={current} />
      </div>
    </div>
  )
}
