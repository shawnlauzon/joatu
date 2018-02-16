import React from 'react'
import { connect } from 'react-redux'

import ChatView from './components/ChatView'

import { fetchMessages } from '../../data/chats/actions'

class ChatContainer extends React.Component {
  getChatId = () => this.props.match.params.chatId

  componentDidMount() {
    this.props.fetchMessages(this.getChatId())
  }

  render() {
    const { authUser, messages } = this.props

    return <ChatView authUser={authUser} messages={messages} />
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
  fetchMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
