import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from './ButtonOffering'

import Offer from '../../../data/offer/model'

const OfferList = props => (
  <div>
    {Object.entries(props.offers).map(([id, offer]) => (
      <ButtonOffering
        key={id}
        id={id}
        name={offer.name}
        to={props.viewUrl + '/' + id}
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
