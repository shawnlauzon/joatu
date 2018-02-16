import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

const AddTextForm = props => {
  const {
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
            multiline
            rows="4"
            margin="normal"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.text}
          />
        </div>
        <div>
          <Button
            variant="flat"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </Button>
          <Button
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
    text: props.text
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

export default AddText
