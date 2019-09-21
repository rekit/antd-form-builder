# antd-form-builder

antd-form-builder is a small (< 300 lines source code) but powerful helper utility for building forms with ant.design for React. It not only helps to define form fields easily but also for fields layout.

[![NPM](https://img.shields.io/npm/v/antd-form-builder.svg)](https://www.npmjs.com/package/antd-form-builder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Live Demo
You can see live demo of examples at: https://rekit.github.io/antd-form-builder .


## Background
I've been using ant.design and this little helper utitlity since 3 years ago in more than 10 projects. Not only in Rekit Studio, Rekit App but also in internal projects of my company. It has been just working well. In the past, every project has a copy of this form builder since it's really small. But it becomes a problem when there are slight difference among projects and it lacks of documentation. So I decided to publish it as a npm module, write docs and create demos for it.

## Philosophy
The key principle in my mind to create antd-form-builder is it should just help to define form fields and the layout while it doesn't reduce the flexibility of antd's original form API. So in simple patterns you can create a form very easily but if a form is much complicated you can still use the original form API. You can even use antd-form-builder together with the raw API in a mixed way.

## Meta Driven
Besides the simplified API which helps to create form easily, antd-form-builder is also very useful if you have meta driven requirement. For example if your form structure needs to be configurable, the meta could be a pure JSON object which can be easily saved and managed separately.

## Usage




Building forms with Ant.design, an amazing UI component library for React, is quite annoying because you need to write much verbose code. Since 3 years ago, 

## Install

```bash
npm install --save-dev antd-form-builder
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'antd-form-builder'

class Example extends Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## API Reference

## License

MIT © [supnate](https://github.com/supnate)
