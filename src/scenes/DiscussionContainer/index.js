import React from 'react'
import { connect } from 'react-redux'

import Conversation from '../../components/Conversation'

import {
  create as createMessage,
  fetch as fetchMessages
} from '../../data/message/actions'

import { authenticatedUser } from '../../data/user/selectors'
import { messagesIn } from '../../data/message/selectors'

class DiscussionContainer extends React.Component {
  constructor(props) {
    super(props)

    props.fetchMessages('discussion', this.getDiscussionId())
  }

  getDiscussionId = () => this.props.match.params.discussionId

  handleSendMessage = text => {
    this.props.createMessage({
      type: 'discussion',
      docId: this.getDiscussionId(),
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
  const discussionId = ownProps.match.params.discussionId

  return {
    authenticatedUser: authenticatedUser(state),
    messages: messagesIn(discussionId)(state)
  }
}

const mapDispatchToProps = {
  createMessage,
  fetchMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionContainer)
