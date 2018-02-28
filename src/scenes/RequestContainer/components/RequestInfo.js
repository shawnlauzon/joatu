import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import ButtonDelete from '../../../components/ButtonDelete'
import UserChip from '../../../components/UserChip'

const RequestInfo = props => (
  <div>
    <Typography variant="display2">{props.request.name}</Typography>
    <Typography variant="body2">{props.request.description}</Typography>
    <div>
      <Typography variant="body2">Requested by</Typography>
      <UserChip user={props.request.owner} />
    </div>

    {props.authenticatedUser &&
      props.authenticatedUser.id === props.request.owner.id && (
        <ButtonDelete handleClick={props.onDelete} />
      )}
  </div>
)

RequestInfo.propTypes = {
  authenticatedUser: PropTypes.object,
  request: PropTypes.shape({
    owner: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired
}

export default RequestInfo
