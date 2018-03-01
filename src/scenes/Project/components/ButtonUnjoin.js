import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})

function ButtonUnjoin(props) {
  const { classes } = props

  return (
    <Button
      className={classes.button}
      onClick={props.handleClick}
      variant="raised"
      color="primary"
      disabled={!props.authenticatedUser}
    >
      I can't make it :(
    </Button>
  )
}

ButtonUnjoin.propTypes = {
  authenticatedUser: PropTypes.object
}

export default withStyles(styles)(ButtonUnjoin)
