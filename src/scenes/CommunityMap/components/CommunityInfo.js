import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

const CommunityInfo = props => (
  <Typography variant="display2">{props.name}</Typography>
)

CommunityInfo.propTypes = {
  name: PropTypes.string.isRequired
}

export default CommunityInfo
