import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'

const Participant = (props) => (
  <Avatar alt='{props.name}' src='./images/{props.id}.jpg' />
)

Participant.propTypes = {
  id: PropTypes.number.isRequired
  // name: PropTypes.string.isRequired
}

export default Participant
