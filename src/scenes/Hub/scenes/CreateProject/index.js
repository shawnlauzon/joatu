import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withFormik } from 'formik'

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

const CreateProjectForm = ({
  values,
  dirty,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  isSubmitting,
  classes,
  cancelUrl,
  onSave,
  authenticatedUser
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="display2" gutterBottom>
            Create Project
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            label="Name"
            required
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid item className={classes.text}>
          We will meet at{' '}
          <TextField
            name="place"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.place}
            helperText="Where?"
            required
          />{' '}
          at{' '}
          <TextField
            name="start"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.start}
            type="datetime-local"
            helperText="When?"
            required
          />{' '}
          for{' '}
          <TextField
            name="duration"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.duration / 60}
            type="number"
            helperText="How long?"
            required
          />{' '}
          hours.
        </Grid>
        <Grid item>
          <TextField
            name="latitude"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.latitude}
            type="number"
            label="Latitude"
            required
          />
          <TextField
            name="longitude"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.longitude}
            type="number"
            label="Longitude"
            required
          />
        </Grid>

        <Grid item>
          <Button className={classes.button} component={Link} to={cancelUrl}>
            Cancel
          </Button>
          <Button
            className={classes.button}
            disabled={!authenticatedUser}
            variant="raised"
            color="primary"
            onClick={onSave}
            // TODO Validate before navigating away
            component={Link}
            to={cancelUrl}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  </div>
)

const CreateProject = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    name: '',
    place: props.hub.name,
    start: moment()
      .add(2, 'weeks')
      .minute(0)
      .format('YYYY-MM-DDTHH:mm'),
    duration: 120,
    latitude: 45.5288239,
    longitude: -73.591279,
    cancelUrl: props.cancelUrl,
    authenticatedUser: props.authenticatedUser,
    onSave: props.onSave
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    await props.onCreate(values.text)

    setSubmitting(false)
    resetForm({
      text: ''
    })
  }
})(CreateProjectForm)

CreateProject.propTypes = {
  authenticatedUser: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  onCreate: PropTypes.func.isRequired,
  hub: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
}

export default withStyles(styles)(CreateProject)
