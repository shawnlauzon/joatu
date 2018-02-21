import React from 'react'
import { connect } from 'react-redux'

import ChatView from './components/ChatView'
import AddText from '../../components/AddText'

import { createMessage } from '../../data/chat/actions'
import { authenticatedUser } from '../../data/user/selectors'

import { messagesInChat } from '../../data/message/selectors'

class ChatContainer extends React.Component {
  getChatId = () => this.props.match.params.chatId

  handleSendMessage = text => {
    this.props.createMessage({
      chatId: this.getChatId(),
      from: this.props.authenticatedUser.id,
      text
    })
  }

  render() {
    const { authenticatedUser, messages } = this.props

    return (
      <div>
        <ChatView authenticatedUser={authenticatedUser} messages={messages} />
        <AddText buttonText="Send" onSave={this.handleSendMessage} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const chatId = ownProps.match.params.chatId

  return {
    authenticatedUser: authenticatedUser(state),
    messages: messagesInChat(chatId)(state)
  }
}

const mapDispatchToProps = {
  createMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
