/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect } from 'react'
import codeBasic from '!!raw-loader!./examples/Basic.js'
import codeDynamicFields from '!!raw-loader!./examples/DynamicFields.js'
import codeAsyncDataSource from '!!raw-loader!./examples/AsyncDataSource.js'
import codeMultipleColumns from '!!raw-loader!./examples/MultipleColumns.js'
import codeComplexLayout from '!!raw-loader!./examples/ComplexLayout.js'
import codeMultipleFormBuilders from '!!raw-loader!./examples/MultipleFormBuilders.js'
import codeSingleField from '!!raw-loader!./examples/SingleField.js'
import codeValidation from '!!raw-loader!./examples/Validation.js'
import codeCoordinated from '!!raw-loader!./examples/Coordinated.js'
import codeFormInModal from '!!raw-loader!./examples/FormInModal.js'
import codeCustomComponent from '!!raw-loader!./examples/CustomComponent.js'
import codeViewEdit from '!!raw-loader!./examples/ViewEdit.js'
import codeMixed from '!!raw-loader!./examples/Mixed.js'
import codeWizard from '!!raw-loader!./examples/Wizard.js'
import codeSimple from '!!raw-loader!./examples/Simple.js'
import codeViewMode from '!!raw-loader!./examples/ViewMode.js'

const codeMap = {
  basic: codeBasic,
  'view-edit': codeViewEdit,
  'dynamic-fields': codeDynamicFields,
  'async-data-source': codeAsyncDataSource,
  'multiple-columns': codeMultipleColumns,
  'complex-layout': codeComplexLayout,
  'multiple-form-builders': codeMultipleFormBuilders,
  'single-field': codeSingleField,
  validation: codeValidation,
  coordinated: codeCoordinated,
  'form-in-modal': codeFormInModal,
  'custom-component': codeCustomComponent,
  mixed: codeMixed,
  wizard: codeWizard,
  simple: codeSimple,
  'view-mode': codeViewMode,
}
export default ({ code }) => {
  useEffect(() => {
    window.Prism.highlightAll()
  }, [code])
  return (
    <pre>
      <code className="language-jsx line-numbers">
        {codeMap[code] || `// Error: code of "${code}" not found`}
      </code>
    </pre>
  )
}
