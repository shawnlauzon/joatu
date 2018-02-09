import * as R from 'ramda'
import React from 'react'

import { Typography } from 'material-ui'

const ParticipantList = props => (
  <div>
    <Typography variant="display1">Participants</Typography>
    {R.isEmpty(props.children) ? (
      <Typography variant="body1">Maybe you?</Typography>
    ) : (
      <div className="participantList">{props.children}</div>
    )}
  </div>
)

export default ParticipantList
