import React, { useState, useEffect } from 'react'
import useHash from './useHash'
import Basic from './examples/Basic'
import DynamicFields from './examples/DynamicFields'
import AsyncDataSource from './examples/AsyncDataSource'
import './App.css'

const examples = {
  basic: { name: 'Basic', component: Basic },
  'dynamic-fields': { name: 'Dynamic Fields', component: DynamicFields },
  'async-data-source': { name: 'Async Data Source', component: AsyncDataSource },
  'multiple-columns': { name: 'Multiple Columns' },
  'complex-layout': { name: 'Complex Layout' },
  'multiple-form-builders': { name: 'Multiple Form Builders' },
  'single-element': { name: 'Single Element' },
  validation: { name: 'Validation' },
  modal: { name: 'Form in Modal' },
  coordinated: { name: 'Coordinated Controls' },
  custom: { name: 'Custom Component' },
  mixed: { name: 'Mixed' },
  wizard: { name: 'Wizard' },
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
