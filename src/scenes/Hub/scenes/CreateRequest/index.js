import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withFormik } from 'formik'

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

const CreateRequestForm = ({
  values,
  dirty,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  isSubmitting,
  classes,
  cancelUrl
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="display2" gutterBottom>
            Create Request
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            name="name"
            label="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            required
            fullWidth
            autoFocus
          />
          <TextField
            name="description"
            label="Description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            fullWidth
            multiline
            rows="4"
          />
        </Grid>

        <Grid item>
          <Button className={classes.button} component={Link} to={cancelUrl}>
            Cancel
          </Button>
          <Button
            type="submit"
            className={classes.button}
            disabled={isSubmitting}
            variant="raised"
            color="primary"
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  </div>
)

const CreateRequest = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    name: '',
    description: '',
    cancelUrl: props.cancelUrl
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    await props.onCreate({
      name: values.name,
      description: values.description
    })

    setSubmitting(false)
    resetForm()
  }
})(CreateRequestForm)

CreateRequest.propTypes = {
  cancelUrl: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default withStyles(styles)(CreateRequest)
