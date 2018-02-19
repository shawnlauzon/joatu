import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import ButtonDelete from '../../../components/ButtonDelete'

const RequestInfo = props => (
  <div>
    <Typography variant="display2">{props.request.name}</Typography>
    <ButtonDelete
      handleClick={props.onDelete}
      authenticatedUser={props.authenticatedUser}
    />
  </div>
)

RequestInfo.propTypes = {
  authenticatedUser: PropTypes.object,
  request: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
}

export default RequestInfo
