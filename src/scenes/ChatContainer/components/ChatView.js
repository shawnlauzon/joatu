import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'

import List, { ListItem, ListItemText } from 'material-ui/List'

const ChatView = ({ messages }) => (
  <div>
    <List>
      {messages &&
        Object.entries(messages).map(([id, message]) => (
          <ListItem key={id}>
            <Avatar alt={message.from.displayName} src={message.from.imgUrl} />
            <ListItemText primary={message.text} />
          </ListItem>
        ))}
    </List>
  </div>
)

ChatView.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired
      }).isRequired,
      text: PropTypes.string.isRequired
    })
  )
}

export default ChatView
