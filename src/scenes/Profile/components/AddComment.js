import React from 'react'
import PropTypes from 'prop-types'

import Typography from 'material-ui/Typography'

import AddText from '../../../components/AddText'

const AddComment = props => (
  <div>
    <Typography>Leave a comment:</Typography>
    <AddText {...props} buttonText="Add comment" />
  </div>
)

AddComment.propTypes = {
  text: PropTypes.string,
  onSave: PropTypes.func.isRequired
}

export default AddComment
