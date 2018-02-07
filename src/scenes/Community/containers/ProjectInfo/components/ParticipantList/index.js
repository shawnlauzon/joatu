import React from 'react'
import PropTypes from 'prop-types'
import Participant from './components/Participant'
import { Typography } from 'material-ui'

const ParticipantList = props => (
  <div>
    <Typography type="display1">Participants</Typography>
    {!props.participants ? (
      <Typography type="body1">Maybe you?</Typography>
    ) : (
      <div className="participantList">
        {Object.keys(props.participants).map(id => (
          <Participant key={id} user={props.users[id]} />
        ))}
      </div>
    )}
  </div>
)

ParticipantList.propTypes = {
  participants: PropTypes.object,
  users: PropTypes.object.isRequired
}

export default ParticipantList
