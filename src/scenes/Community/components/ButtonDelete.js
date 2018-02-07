import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
      component={Link}
      to=".."
      color="secondary"
      disabled={!props.authenticated}
      onClick={props.handleClick}
    >
      Delete
      <Delete className={classes.rightIcon} />
    </Button>
  )
}

ButtonDelete.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

export default withStyles(styles)(ButtonDelete)
