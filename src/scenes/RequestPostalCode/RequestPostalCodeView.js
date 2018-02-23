import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { withStyles } from 'material-ui/styles'

import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

const styles = theme => ({
  postalCode: {
    textTransform: 'uppercase'
  }
})

const RequestPostalCodeForm = ({
  values,
  dirty,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  isSubmitting,
  classes
}) => {
  return (
    <div>
      <Typography variant="body2">
        We need to know your approximate location to assign you to the nearest
        community hub
      </Typography>
      <Typography variant="body2">Please enter your postal code</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="postalCode"
          margin="normal"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.postalCode}
          autoFocus
          inputProps={{
            className: classes.postalCode,
            pattern: '[A-Za-z][1-9][A-Za-z][1-9][A-Za-z][1-9]',
            title: 'Postal code format is like H2J1G3',
            maxLength: 6
          }}
        />
        <div>
          <Button
            variant="raised"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

const RequestPostalCodeView = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    postalCode: ''
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    await props.onSave(values.postalCode.toUpperCase())

    setSubmitting(false)
    resetForm({
      postalCode: ''
    })
  }
})(withStyles(styles)(RequestPostalCodeForm))

RequestPostalCodeView.propTypes = {
  onSave: PropTypes.func.isRequired
}

export default RequestPostalCodeView
