import { Col, Row } from 'antd'
import has from 'lodash/has'
import React from 'react'

export default ({ elements, meta }) => {
  const columns = meta.columns || 1
  const fields = meta.fields
  if (columns === 1) {
    return elements
  }

  // const meta = this.getMeta()
  const gutter = has(meta, 'gutter') ? meta.gutter : 10
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
      <Row key={i} gutter={gutter}>
        {cols}
      </Row>,
    )
  }
  return rows
}
