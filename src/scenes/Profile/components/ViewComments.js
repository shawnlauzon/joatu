import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import List, { ListItem } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'

import Message from '../../../components/Message'

const ViewComments = ({ comments, classes }) => (
  <div>
    <List>
      {comments.map(comment => (
        <ListItem key={comment.id}>
          <Message from={comment.from} text={comment.text} />
        </ListItem>
      ))}
    </List>
  </div>
)

ViewComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.object.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
}

export default ViewComments
