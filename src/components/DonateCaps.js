import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})

const DonateCapsForm = props => {
  const {
    classes,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <Button
        className={classes.button}
        variant="raised"
        color="primary"
        type="submit"
        disabled={isSubmitting || values.caps <= 0}
      >
        Donate
      </Button>
      <TextField
        name="caps"
        type="number"
        value={values.caps}
        inputProps={{
          min: 0,
          max: props.capsAvailable
        }}
        margin="normal"
        onChange={handleChange}
        onBlur={handleBlur}
        variant="raised"
        size="small"
      />{' '}
      &#8353;
    </form>
  )
}

const DonateCaps = withFormik({
  mapPropsToValues: props => ({
    capsAvailable: props.capsAvailable,
    caps: 0
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    props.onSave(values.caps)
    setSubmitting(false)
    resetForm({
      caps: 0
    })
  }
})(DonateCapsForm)

DonateCaps.propTypes = {
  capsAvailable: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired
}

export default withStyles(styles)(DonateCaps)
