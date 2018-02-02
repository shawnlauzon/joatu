import React from 'react'
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
      raised
      color="secondary"
      onClick={props.handleClick}
    >
      Delete
      <Delete className={classes.rightIcon} />
    </Button>
  )
}

export default withStyles(styles)(ButtonDelete)
