import React, { Component } from 'react'
import { connect } from 'react-redux'

import RequestInfo from './components/RequestInfo'

import { requestActions } from '../../data/actions'

class RequestContainer extends Component {
  constructor(props) {
    super(props)

    this.requestId = props.match.params.requestId
  }

  render() {
    if (!this.props.request) {
      return null
    }
    return (
      <RequestInfo
        authUser={this.props.authUser}
        request={this.props.request}
        owner={this.props.owner}
        onDelete={() => this.props.removeRequest(this.requestId)}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const requestId = ownProps.match.params.requestId

  const request = state.requests[requestId]
  const owner = request ? state.users[request.owner] : {}

  return {
    authUser: state.authUser,
    owner,
    request
  }
}

const mapDispatchToProps = {
  removeRequest: requestActions.remove
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestContainer)
