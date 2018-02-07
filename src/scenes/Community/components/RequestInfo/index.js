import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'

const RequestInfo = props => (
  <Typography type="display2">{props.name}</Typography>
)

RequestInfo.propTypes = {
  name: PropTypes.string.isRequired
}

export default RequestInfo
