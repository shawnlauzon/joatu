import React from 'react'
import PropTypes from 'prop-types'
import Participant from './components/Participant'

const ParticipantList = (props) => (
  <div className='participantList'>
    {props.participants.map(participant => <Participant key={participant.id} id={participant.id} />)}
  </div>
)

ParticipantList.propTypes = {
  participants: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default ParticipantList
