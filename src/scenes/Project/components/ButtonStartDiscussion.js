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

const ButtonStartDiscussion = ({ authenticatedUser, topic, url, classes }) => (
  <Button
    className={classes.button}
    variant="raised"
    color="primary"
    component={Link}
    to={url}
  >
    Discuss {topic}
  </Button>
)

ButtonStartDiscussion.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
  topic: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default withStyles(styles)(ButtonStartDiscussion)
