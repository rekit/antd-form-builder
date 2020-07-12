import React, { useCallback, useState } from 'react'
import _ from 'lodash'
import { Form, Button, Steps } from 'antd'
import FormBuilder from 'antd-form-builder'
const { Step } = Steps
const DateView = ({ value }) => (value ? value.format('MMM Do YYYY') : 'N/A')

FormBuilder.defineWidget('date-view', DateView)

const wizardMeta = {
  steps: [
    {
      title: 'Personal Information',
      formMeta: {
        columns: 2,
        fields: [
          { key: 'name.first', label: 'First Name', initialValue: 'Nate', required: true },
          { key: 'name.last', label: 'Last Name', initialValue: 'Wang', required: true },
          { key: 'dob', label: 'Date of Birth', widget: 'date-picker', viewWidget: 'date-view' },
          {
            key: 'noAccountInfo',
            label: 'No Account Info',
            widget: 'switch',
            dynamic: true,
            tooltip: 'Switch on to remove account step',
          },
        ],
      },
    },
    {
      title: 'Account Information',
      formMeta: {
        columns: 2,
        fields: [
          {
            key: 'email',
            label: 'Email',
            clear: 'right',
            rules: [{ type: 'email', message: 'Invalid email' }],
          },
          {
            key: 'security',
            label: 'Security Question',
            widget: 'select',
            placeholder: 'Select a question...',
            options: ["What's your pet's name?", 'Your nick name?'],
          },
          { key: 'answer', label: 'Security Answer' },
        ],
      },
    },
    {
      title: 'Contact Information',
      formMeta: {
        columns: 2,
        fields: [
          { key: 'address', label: 'Address', colSpan: 2 },
          { key: 'city', label: 'City' },
          { key: 'phone', label: 'phone' },
        ],
      },
    },
  ],
}

export default () => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const forceUpdate = FormBuilder.useForceUpdate()
  const handleFinish = useCallback(() => {
    console.log('Submit: ', form.getFieldsValue(true))
  }, [form])

  // Clone the meta for dynamic change
  const newWizardMeta = JSON.parse(JSON.stringify(wizardMeta))
  // In a wizard, every field should be preserved when swtich steps.
  // newWizardMeta.steps.forEach(s => s.formMeta.fields.forEach(f => (f.preserve = true)))
  if (form.getFieldValue('noAccountInfo')) {
    _.pullAt(newWizardMeta.steps, 1)
  }

  // Generate a general review step
  const reviewFields = []
  newWizardMeta.steps.forEach((s, i) => {
    reviewFields.push(
      {
        key: 'review' + i,
        colSpan: 2,
        render() {
          return (
            <fieldset>
              <legend>{s.title}</legend>
            </fieldset>
          )
        },
      },
      ...s.formMeta.fields,
    )
  })

  newWizardMeta.steps.push({
    key: 'review',
    title: 'Review',
    formMeta: {
      columns: 2,
      fields: reviewFields,
    },
  })

  const stepsLength = newWizardMeta.steps.length

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1)
    })
  }
  const handleBack = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep - 1)
    })
  }
  const isReview = currentStep === stepsLength - 1
  return (
    <Form
      layout="horizontal"
      form={form}
      onValuesChange={forceUpdate}
      style={{ width: '880px' }}
      onFinish={handleFinish}
    >
      <Steps current={currentStep}>
        {newWizardMeta.steps.map(s => (
          <Step key={s.title} title={s.title} />
        ))}
      </Steps>
      <div style={{ background: '#f7f7f7', padding: '20px', margin: '30px 0' }}>
        <FormBuilder
          viewMode={currentStep === stepsLength - 1}
          form={form}
          meta={newWizardMeta.steps[currentStep].formMeta}
        />
      </div>
      <Form.Item className="form-footer" style={{ textAlign: 'right' }}>
        {currentStep > 0 && (
          <Button onClick={handleBack} style={{ float: 'left', marginTop: '5px' }}>
            Back
          </Button>
        )}
        <Button>Cancel</Button>&nbsp; &nbsp;
        <Button type="primary" onClick={isReview ? () => form.submit() : handleNext}>
          {isReview ? 'Submit' : 'Next'}
        </Button>
      </Form.Item>
    </Form>
  )
}
