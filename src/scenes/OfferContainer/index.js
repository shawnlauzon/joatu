import React, { Component } from 'react'
import { connect } from 'react-redux'

import OfferInfo from './components/OfferInfo'

import { offerActions } from '../../data/actions'

class OfferContainer extends Component {
  offerId = () => this.props.match.params.offerId

  render() {
    if (!this.props.offer) {
      return null
    }
    return (
      <OfferInfo
        authUser={this.props.authUser}
        offer={this.props.offer}
        owner={this.props.owner}
        onDelete={() => this.props.removeOffer(this.offerId())}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const offerId = ownProps.match.params.offerId

  const offer = state.offers[offerId]
  const owner = offer ? state.users[offer.owner] : {}

  return {
    authUser: state.authUser,
    owner,
    offer
  }
}

const mapDispatchToProps = {
  removeOffer: offerActions.remove
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferContainer)
