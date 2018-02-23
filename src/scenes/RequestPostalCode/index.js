import React, { Component } from 'react'
import { connect } from 'react-redux'

import { authenticatedUser } from '../../data/user/selectors'

import { update } from '../../data/user/actions'

import RequestPostalCodeView from './RequestPostalCodeView'

class RequestPostalCode extends Component {
  handleUpdatePostalCode = postalCode => {
    this.props.updateUser(this.props.authenticatedUser.id, { postalCode })
  }

  render() {
    return <RequestPostalCodeView onSave={this.handleUpdatePostalCode} />
  }
}

function mapStateToProps(state, ownProps) {
  return {
    authenticatedUser: authenticatedUser(state)
  }
}

const mapDispatchToProps = {
  updateUser: update
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPostalCode)
