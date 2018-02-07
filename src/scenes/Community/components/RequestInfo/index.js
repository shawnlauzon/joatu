import React from 'react'
import { Typography } from 'material-ui'

const RequestInfo = props => (
  <Typography type="display2">{props.request.name}</Typography>
)

export default RequestInfo
