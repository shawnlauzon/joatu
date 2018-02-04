import React from 'react'
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
    >
      I'm in!
    </Button>
  )
}

export default withStyles(styles)(ButtonJoin)
