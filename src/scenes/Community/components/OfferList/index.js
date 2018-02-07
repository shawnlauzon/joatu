import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from '../ButtonOffering'

const OfferList = props => (
  <div>
    {Object.entries(props.offers).map(([id, offer]) => (
      <ButtonOffering key={id} id={id} name={offer.name} to={`/offers/${id}`} />
    ))}
  </div>
)

OfferList.propTypes = {
  offers: PropTypes.object.isRequired
}

export default OfferList
