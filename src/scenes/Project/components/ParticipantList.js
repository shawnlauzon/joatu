import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

const ParticipantList = props => (
  <div>
    <Typography variant="display1">Participants</Typography>
    {R.isEmpty(props.children) ? (
      <Typography variant="body1">
        {props.isOwner ? 'None yet' : 'Maybe you?'}
      </Typography>
    ) : (
      <div className="participantList">{props.children}</div>
    )}
  </div>
)

ParticipantList.propTypes = {
  isOwner: PropTypes.bool.isRequired
}

export default ParticipantList
