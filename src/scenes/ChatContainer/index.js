import React from 'react'
import { connect } from 'react-redux'

import ChatView from './components/ChatView'
import AddText from '../../components/AddText'

import { fetchMessages, createMessage } from '../../data/chats/actions'

class ChatContainer extends React.Component {
  getChatId = () => this.props.match.params.chatId

  componentDidMount() {
    this.props.fetchMessages(this.getChatId())
  }

  handleSendMessage = text => {
    this.props.createMessage({
      chatId: this.getChatId(),
      from: this.props.authUser.id,
      text
    })
  }

  render() {
    const { authUser, messages } = this.props

    return (
      <div>
        <ChatView authUser={authUser} messages={messages} />
        <AddText buttonText="Send" onSave={this.handleSendMessage} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    authUser: state.authUser,
    messages:
      state.chats[ownProps.match.params.chatId] &&
      state.chats[ownProps.match.params.chatId].messages
  }
}

const mapDispatchToProps = {
  fetchMessages,
  createMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
