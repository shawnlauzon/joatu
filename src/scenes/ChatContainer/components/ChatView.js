import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'

import List, { ListItem, ListItemText } from 'material-ui/List'

import Message from '../../../components/Message'

const ChatView = ({ messages }) => (
  <div>
    <List>
      {messages &&
        Object.entries(messages).map(([id, message]) => (
          <ListItem key={id}>
            <Message from={message.from} text={message.text} />
          </ListItem>
        ))}
    </List>
  </div>
)

ChatView.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.object.isRequired,
      text: PropTypes.string.isRequired
    })
  )
}

export default ChatView
