import React from 'react'
import useHash from './useHash'
import Basic from './examples/Basic'
import DynamicFields from './examples/DynamicFields'
import AsyncDataSource from './examples/AsyncDataSource'
import MultipleColumns from './examples/MultipleColumns'
import ComplexLayout from './examples/ComplexLayout'
import MultipleFormBuilders from './examples/MultipleFormBuilders'
import './App.css'

const examples = {
  basic: { name: 'Basic', component: Basic },
  'view-mode': { name: 'View Mode', component: ComplexLayout },
  'dynamic-fields': { name: 'Dynamic Fields', component: DynamicFields },
  'async-data-source': { name: 'Async Data Source', component: AsyncDataSource },
  'multiple-columns': { name: 'Multiple Columns', component: MultipleColumns },
  'complex-layout': { name: 'Complex Layout', component: ComplexLayout },
  'multiple-form-builders': { name: 'Multiple Form Builders', component: MultipleFormBuilders },
  'single-element': { name: 'Single Element', component: ComplexLayout },
  validation: { name: 'Validation', component: ComplexLayout },
  modal: { name: 'Form in Modal', component: ComplexLayout },
  coordinated: { name: 'Coordinated Controls', component: ComplexLayout },
  custom: { name: 'Custom Component', component: ComplexLayout },
  mixed: { name: 'Mixed', component: ComplexLayout },
  wizard: { name: 'Wizard', component: ComplexLayout },
}

export default () => {
  const current = useHash() || 'basic'

  const renderExample = () => {
    if (!examples[current] || !examples[current].component) {
      return <span style={{ color: 'red' }}>Error: example "{current}" not found.</span>
    }
    const Comp = examples[current].component
    return (
      <React.Fragment>
        <h1>{examples[current].name}</h1>
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
    </div>
  )
}
