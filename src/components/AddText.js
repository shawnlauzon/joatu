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

const AddTextForm = props => {
  const {
    classes,
    values,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <TextField
            name="text"
            margin="normal"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.text}
            fullWidth
          />
        </div>
        <div>
          <Button
            className={classes.button}
            variant="flat"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </Button>
          <Button
            className={classes.button}
            variant="raised"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {props.buttonText || 'OK'}
          </Button>
        </div>
      </div>
    </form>
  )
}

const AddText = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    text: props.text || ''
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    await props.onSave(values.text)

    setSubmitting(false)
    resetForm({
      text: ''
    })
  }
})(AddTextForm)

AddText.propTypes = {
  text: PropTypes.string,
  buttonText: PropTypes.string,
  onSave: PropTypes.func.isRequired
}

export default withStyles(styles)(AddText)
