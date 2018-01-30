import React from 'react'
import PropTypes from 'prop-types'
import Participant from './components/Participant'

const ParticipantList = (props) => (
  <div>
    Who else?
    <div className='participantList'>
      {props.participants.map(participantId =>
        <Participant key={participantId} user={props.users[participantId]} />)}
    </div>
  </div>
)

ParticipantList.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.number),
  users: PropTypes.object.isRequired
}

export default ParticipantList
