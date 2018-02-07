import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'

const OfferInfo = props => <Typography type="display2">{props.name}</Typography>

OfferInfo.propTypes = {
  name: PropTypes.string.isRequired
}

export default OfferInfo
