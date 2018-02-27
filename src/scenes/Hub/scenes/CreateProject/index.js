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
          <Typography component="span" variant="body2">
            We will meet at
            <TextField
              component="span"
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
          </Typography>
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
    place: props.hub ? props.hub.name : undefined,
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
  })
}

export default withStyles(styles)(CreateProject)
