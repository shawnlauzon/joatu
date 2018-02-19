import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import List, { ListItem } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'

const componentName = ({ comments }) => (
  <div>
    <List>
      {comments.map(comment => (
        <ListItem key={comment.id}>
          <Avatar
            alt={comment.from.displayName}
            src={comment.from.imgUrl}
            component={Link}
            to={`/profiles/${comment.from.id}`}
          />
          <Typography variant="body2">{comment.text}</Typography>
        </ListItem>
      ))}
    </List>
  </div>
)

componentName.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      from: PropTypes.shape({
        id: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired
      })
    })
  ).isRequired
}

export default componentName
