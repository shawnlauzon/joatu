import React, { Component } from 'react'
import { connect } from 'react-redux'

import OfferInfo from './components/OfferInfo'
import ButtonStartChat from '../../components/ButtonStartChat'

import { offerActions } from '../../data/actions'

import { authenticatedUser } from '../../data/user/selectors'

import { offerWithId } from '../../data/offer/selectors'

class OfferContainer extends Component {
  offerId = () => this.props.match.params.offerId

  render() {
    if (!this.props.offer) {
      return null
    }
    return (
      <div>
        <OfferInfo
          authenticatedUser={this.props.authenticatedUser}
          offer={this.props.offer}
          onDelete={() => this.props.removeOffer(this.offerId())}
        />
        <ButtonStartChat user={this.props.offer.owner} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const offerId = ownProps.match.params.offerId

  return {
    authenticatedUser: authenticatedUser(state),
    offer: offerWithId(offerId)(state)
  }
}
const mapDispatchToProps = {
  removeOffer: offerActions.remove
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferContainer)
