import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Delete from 'material-ui-icons/Delete'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

function ButtonDelete(props) {
  const { classes } = props

  return (
    <Button
      className={classes.button}
      variant="raised"
      color="secondary"
      disabled={!props.authenticatedUser}
      onClick={props.handleClick}
    >
      Delete
      <Delete className={classes.rightIcon} />
    </Button>
  )
}

ButtonDelete.propTypes = {
  authenticatedUser: PropTypes.object,
  handleClick: PropTypes.func.isRequired
}

export default withStyles(styles)(ButtonDelete)
