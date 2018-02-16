import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'

const ButtonStartChat = props => (
  <Button variant="raised" color="primary" component={Link} to={props.url}>
    Chat with {props.name.split(' ')[0]}
  </Button>
)

ButtonStartChat.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default ButtonStartChat
