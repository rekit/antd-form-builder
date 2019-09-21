# antd-form-builder

antd-form-builder is a small (< 300 lines source code) but powerful helper utility for building forms with ant.design for React. It not only helps to define form fields easily but also for fields layout.

[![NPM](https://img.shields.io/npm/v/antd-form-builder.svg)](https://www.npmjs.com/package/antd-form-builder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Live Demo


## Background
I've been using ant.design and this little helper utitlity since 3 years ago in more than 10 projects. Not only in Rekit Studio, Rekit App but also in internal projects of my company. It has been just working well. In the past, every project has a copy of this form builder since it's really small. But it becomes a problem when there are slight difference among projects and it lacks of documentation. So I decided to publish it as a npm module and write docs, create demos for it.

The key philosophy is as below:
* It's not a API wrapper, but a helper, so it doesn't limit any capability of the original antd form.
* 



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
