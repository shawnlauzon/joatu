import React from 'react'
import { connect } from 'react-redux'

import Conversation from '../../components/Conversation'

import { create, fetch } from '../../data/message/actions'
import { authenticatedUser } from '../../data/user/selectors'

import { messagesInChat } from '../../data/message/selectors'

class ChatContainer extends React.Component {
  constructor(props) {
    super(props)

    props.fetchMessages(this.getChatId())
  }

  getChatId = () => this.props.match.params.chatId

  handleSendMessage = text => {
    this.props.createMessage({
      chatId: this.getChatId(),
      from: this.props.authenticatedUser.id,
      text
    })
  }

  render() {
    const { messages } = this.props

    return (
      <Conversation messages={messages} onNewMessage={this.handleSendMessage} />
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
  createMessage: create,
  fetchMessages: fetch
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
