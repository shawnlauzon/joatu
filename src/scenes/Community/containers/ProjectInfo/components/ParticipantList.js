import React from 'react'

import { Typography } from 'material-ui'

const ParticipantList = props => (
  <div>
    <Typography type="display1">Participants</Typography>
    {!props.children ? (
      <Typography type="body1">Maybe you?</Typography>
    ) : (
      <div className="participantList">{props.children}</div>
    )}
  </div>
)

export default ParticipantList
