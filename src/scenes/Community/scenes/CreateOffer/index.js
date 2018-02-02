import React from 'react'
import { Link } from 'react-router-dom'

import moment from 'moment'

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
      location: 'the community center',
      start: moment()
        .add(2, 'weeks')
        .minute(0)
        .format('YYYY-MM-DDTHH:mm'),
      duration: 120
    }
  }

  onInputChange = event => {
    const target = event.target
    const value = target.value
    const id = target.id

    this.setState({
      [id]: value
    })
  }

  onSaveOffer = e => {
    this.props.onCreateProject({
      name: this.state.name,
      location: this.state.location,
      start: new Date(this.state.start),
      duration: Number(this.state.duration)
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
            onChange={this.onInputChange}
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
            onChange={this.onInputChange}
            required
          />{' '}
          at{' '}
          <TextField
            id="start"
            type="datetime-local"
            helperText="When?"
            value={this.state.start}
            onChange={this.onInputChange}
            required
          />{' '}
          for{' '}
          <TextField
            id="duration"
            type="number"
            helperText="How long?"
            value={this.state.duration}
            onChange={this.onInputChange}
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
