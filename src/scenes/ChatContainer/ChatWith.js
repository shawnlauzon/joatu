import { isEmpty } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import ChatView from './components/ChatView'

import { create } from '../../data/chats/actions'

class ChatContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chatCreated: false
    }

    this.maybeCreateNewChat(props)
  }

  maybeCreateNewChat = props => {
    // Have we loaded the user but still not have a chat?
    if (!this.state.chatCreated && props.user && !props.chat) {
      this.createChat()
    } // else ???
  }

  componentWillReceiveProps(newProps) {
    this.maybeCreateNewChat(newProps)
  }

  getChateeId = () => this.props.match.params.userId

  createChat = () => {
    this.setState({
      chatCreated: true
    })

    this.props.create({
      participants: [this.props.authUser.id, this.getChateeId()]
    })
  }

  render() {
    const { chat } = this.props

    console.log('chat', chat)

    return <ChatView messages={chat ? chat.messages : {}} />
  }
}

function mapStateToProps(state, ownProps) {
  const authUserId = state.authUser.id
  const chateeId = ownProps.match.params.userId

  // TODO Figure out if there is a better way to access this
  const chatId =
    authUserId &&
    !isEmpty(state.users) &&
    state.users[authUserId].chats &&
    state.users[authUserId].chats[chateeId]
  console.log('chatId', chatId)

  return {
    authUser: state.authUser,
    user: state.users[authUserId], // FIXME hack so we know if user has been loaded
    chat: state.chats[chatId]
  }
}

const mapDispatchToProps = {
  create
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
