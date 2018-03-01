import React from 'react'
import PropTypes from 'prop-types'

import List, { ListItem } from 'material-ui/List'

import Message from './Message'
import AddText from './AddText'

const Conversation = ({ messages, disableNewMessages, onNewMessage }) => (
  <div>
    <List>
      {messages &&
        Object.entries(messages).map(([id, message]) => (
          <ListItem key={id}>
            <Message from={message.from} text={message.text} />
          </ListItem>
        ))}
    </List>
    {disableNewMessages !== true && (
      <AddText buttonText="Send" onSave={onNewMessage} />
    )}
  </div>
)

Conversation.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.object.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  disableNewMessages: PropTypes.bool,
  onNewMessage: PropTypes.func.isRequired
}

export default Conversation
