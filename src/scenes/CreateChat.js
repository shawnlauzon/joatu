import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { authenticatedUser } from '../data/user/selectors'
import { chatWithUser } from '../data/chat/selectors'

import { create } from '../data/chat/actions'

class CreateChat extends React.Component {
  constructor(props) {
    super(props)

    // Set this state so that if we get more props, the chat is only created
    // once.
    if (props.authenticatedUser) {
      this.state = { chatCreated: true }
      this.createChat(props)
    } else {
      this.state = { chatCreated: false }
    }
  }

  createChat = props => {
    props.createChat({
      participants: [props.authenticatedUser.id, this.getChateeId()]
    })
  }

  getChateeId = () => this.props.match.params.userId

  componentWillReceiveProps(newProps) {
    if (!this.state.chatCreated && newProps.authenticatedUser) {
      this.setState({ chatCreated: true })
      this.createChat(newProps)
    }
  }

  render() {
    const { chat } = this.props

    if (chat) {
      return <Redirect to={`/chats/${chat.id}`} />
    } else {
      return <div>Creating chat ...</div>
    }
  }
}

function mapStateToProps(state, ownProps) {
  const chatUserId = ownProps.match.params.userId

  return {
    authenticatedUser: authenticatedUser(state),
    chat: chatWithUser(chatUserId)(state)
  }
}

const mapDispatchToProps = {
  createChat: create
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChat)
