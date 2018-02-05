import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})

function ButtonJoin(props) {
  const { classes } = props

  return (
    <Button
      className={classes.button}
      onClick={props.handleClick}
      raised
      color="primary"
      disabled={!props.user.authenticated}
    >
      I'm in!
    </Button>
  )
}

ButtonJoin.propTypes = {
  user: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired
}

export default withStyles(styles)(ButtonJoin)
