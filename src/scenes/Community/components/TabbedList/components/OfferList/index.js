import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from '../../../../../../components/ButtonOffering'

const OfferList = props => (
  <div>
    {props.trades &&
      Object.entries(props.offers).map(([id, offer]) => (
        <ButtonOffering
          key={id}
          id={id}
          name={offer.name}
          to={`/offers/${id}`}
        />
      ))}
  </div>
)

OfferList.propTypes = {
  offers: PropTypes.object
}

export default OfferList
