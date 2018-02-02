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
  },
  text: {
    // It's weird that this is necessary, but without it I get serif
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
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
    this.setState({ name: e.target.value })
  }

  onLocationChange = e => {
    this.setState({ location: e.target.value })
  }

  onDateTimeChange = e => {
    this.setState({ dateTime: e.target.value })
  }

  onDurationChange = e => {
    this.setState({ duration: e.target.value })
  }

  onSaveOffer = e => {
    this.props.onCreateProject({
      name: this.state.name,
      location: this.state.location,
      dateTime: this.state.dateTime,
      duration: this.state.duration
    })
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
          <TextField
            id="name"
            label="Name"
            value={this.state.name}
            onChange={this.onNameChange}
            required
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid item className={classes.text}>
          We will meet at{' '}
          <TextField
            id="location"
            helperText="Where?"
            value={this.state.location}
            onChange={this.onLocationChange}
            required
          />{' '}
          at{' '}
          <TextField
            id="date"
            type="datetime-local"
            helperText="When?"
            value={this.state.dateTime}
            onChange={this.onDateTimeChange}
            required
          />{' '}
          for{' '}
          <TextField
            id="duration"
            type="number"
            helperText="How long?"
            value={this.state.duration}
            onChange={this.onDurationChange}
            required
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
            onClick={this.onSaveOffer}
            // TODO Validate before navigating away
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
