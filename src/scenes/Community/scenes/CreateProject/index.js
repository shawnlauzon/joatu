import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import moment from 'moment'

import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  text: {
    // It's weird that this is necessary, but without it I get serif
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
  }
})

class CreateProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      place: 'the community center',
      start: moment()
        .add(2, 'weeks')
        .minute(0)
        .format('YYYY-MM-DDTHH:mm'),
      duration: 120,
      latitude: 45.5288239,
      longitude: -73.591279
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

  onSave = e => {
    this.props.onCreate({
      community: this.props.community.id,
      owner: this.props.authenticated.id,
      name: this.state.name,
      place: this.state.place,
      start: new Date(this.state.start),
      duration: Number(this.state.duration),
      coordinates: {
        latitude: Number(this.state.latitude),
        longitude: Number(this.state.longitude)
      }
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Grid container direction="column">
        <Grid item>
          <Typography type="display2" gutterBottom>
            Create Project
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
            id="place"
            helperText="Where?"
            value={this.state.place}
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
          minutes.
        </Grid>
        <Grid item>
          <TextField
            id="latitude"
            type="number"
            label="Latitude"
            value={this.state.latitude}
            onChange={this.onInputChange}
            required
          />
          <TextField
            id="longitude"
            type="number"
            label="Longitude"
            value={this.state.longitude}
            onChange={this.onInputChange}
            required
          />
        </Grid>

        <Grid item>
          <Button className={classes.button} component={Link} to="..">
            Cancel
          </Button>
          <Button
            className={classes.button}
            raised
            color="primary"
            onClick={this.onSave}
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

CreateProject.propTypes = {
  authenticated: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  community: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onCreate: PropTypes.func.isRequired
}

export default withStyles(styles)(CreateProject)
