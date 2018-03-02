import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import { authenticatedUser } from '../../../data/user/selectors'
import { chatWithUser } from '../../../data/chat/selectors'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})

const ButtonStartChat = ({ authenticatedUser, chat, user, classes }) => {
  const url = chat ? `/chats/${chat.id}` : `/chat-with/${user.id}`

  return (
    <Button
      className={classes.button}
      variant="raised"
      color="primary"
      component={Link}
      to={url}
      disabled={user.homeHub !== authenticatedUser.homeHub}
    >
      Chat with {user.displayName.split(' ')[0]}
    </Button>
  )
}

ButtonStartChat.propTypes = {
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    authenticatedUser: authenticatedUser(state),
    chat: chatWithUser(ownProps.userId)(state)
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ButtonStartChat))
