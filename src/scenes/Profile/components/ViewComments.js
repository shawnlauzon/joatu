import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import List, { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

const componentName = ({ comments }) => (
  <div>
    <List>
      {comments.map(comment => (
        <ListItem key={comment.id}>
          <Avatar
            alt={comment.from.data.displayName}
            src={comment.from.data.imgUrl}
            component={Link}
            to={`/profiles/${comment.from.id}`}
          />
          {comment.text}
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
        data: PropTypes.shape({
          displayName: PropTypes.string.isRequired,
          imgUrl: PropTypes.string.isRequired
        })
      })
    })
  ).isRequired
}

export default componentName
