import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'

const AddCommentForm = props => {
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
        <Typography>Leave a comment:</Typography>

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
            Add comment
          </Button>
        </div>
      </div>
    </form>
  )
}

const AddComment = withFormik({
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
})(AddCommentForm)

AddComment.propTypes = {
  text: PropTypes.string,
  onSave: PropTypes.func.isRequired
}

export default AddComment
