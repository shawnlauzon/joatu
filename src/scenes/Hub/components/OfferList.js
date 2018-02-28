import React from 'react'
import PropTypes from 'prop-types'
import ListItemOffering from './ListItemOffering'

import Offer from '../../../data/offer/model'

const OfferList = props => (
  <div>
    {props.offers.map(offer => (
      <ListItemOffering
        key={offer.id}
        id={offer.id}
        name={offer.name}
        to={props.viewUrl + '/' + offer.id}
      />
    ))}
  </div>
)

OfferList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)).isRequired,
  viewUrl: PropTypes.string.isRequired,
  createUrl: PropTypes.string.isRequired
}

export default OfferList
