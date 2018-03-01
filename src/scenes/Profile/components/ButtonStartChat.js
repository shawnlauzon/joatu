import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})

const ButtonStartChat = ({ authenticatedUser, user, url, classes }) => (
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

ButtonStartChat.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
}

export default withStyles(styles)(ButtonStartChat)
