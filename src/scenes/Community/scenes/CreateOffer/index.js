import React from 'react'
import { Link } from 'react-router-dom'

import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  button: {
    margin: 8
  }
})

class CreateOffer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      dateTime: '',
      duration: 0
    }
  }

  onNameChange = e => {
    this.setState(prevState => ({ name: e.target.value }))
  }

  render() {
    const { classes } = this.props

    return (
      <Grid container direction="column">
        <Grid item>
          <Typography type="display2" gutterBottom>
            Create Offer
          </Typography>
        </Grid>
        <Grid item>
          <TextField id="name" label="Name" required fullWidth autoFocus />
        </Grid>
        <Grid item>
          We will meet at{' '}
          <TextField id="location" required helperText="Where?" /> at{' '}
          <TextField
            id="date"
            type="datetime-local"
            required
            helperText="When?"
          />{' '}
          for{' '}
          <TextField
            id="duration"
            helperText="How long?"
            required
            type="number"
          />{' '}
          hours.
        </Grid>
        <Grid item>
          <Button className={classes.button} raised component={Link} to="..">
            Cancel
          </Button>
          <Button
            className={classes.button}
            raised
            color="primary"
            component={Link}
            to=".."
          >
            Create
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(CreateOffer)
